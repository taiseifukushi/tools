# frozen_string_literal: true

class SearchRubygems
  require "securerandom"
  require "net/http"
  require "uri"
  require "json"
  
  PUSH_RETRY_TIMES = 3
  RANDOM_STRING_FOR_SEARCH = 2

  class SearchResultsEmptyError < StandardError; end

  # rubygemsのjsonをランダムに取得
  # curl "https://rubygems.org/api/v1/search.json?query=${query}"
  def get_rubygems
    retry_times ||= 0

    query = SecureRandom.alphanumeric(RANDOM_STRING_FOR_SEARCH)
    url = URI.parse("https://rubygems.org/api/v1/search.json?query=#{query}")
    response = Net::HTTP.get(url)

    raise SearchResultsEmptyError if response.empty?
    response
  rescue StandardError
    retry_times += 1
    retry if retry_times <= PUSH_RETRY_TIMES
  end
end

# frozen_string_literal: true

class SearchRubygems
  require "securerandom"
  require "net/http"
  require "uri"
  require "json"
  require "pry"
  
  PUSH_RETRY_TIMES = 3
  RANDOM_STRING_FOR_SEARCH = 2

  class SearchResultsEmptyError < StandardError; end

  # rubygemsのjsonをランダムに取得
  # curl "https://rubygems.org/api/v1/search.json?query=${query}"
  def get_rubygems
    retry_times ||= 0

    query = SecureRandom.alphanumeric(RANDOM_STRING_FOR_SEARCH)
    uri = URI.parse("https://rubygems.org/api/v1/search.json?query=#{query}")
    response = JSON.parse(Net::HTTP.get(uri))
    raise SearchResultsEmptyError if response.empty?
    response
  rescue StandardError
    retry_times += 1
    retry if retry_times <= PUSH_RETRY_TIMES
  end
end

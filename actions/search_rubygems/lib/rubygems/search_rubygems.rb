# frozen_string_literal: true

class SearchRubygems
  require "securerandom"
  require "net/http"
  require "uri"
  require "json"
  
  RANDOM_STRING_FOR_SEARCH = 2

  # rubygemsのjsonをランダムに取得
  # curl "https://rubygems.org/api/v1/search.json?query=${query}"
  def get_rubygems
    query = SecureRandom.alphanumeric(RANDOM_STRING_FOR_SEARCH)
    url = URI.parse("https://rubygems.org/api/v1/search.json?query=#{query}")
    Net::HTTP.get(url)
  # rescue
    # Todo: 例外処理
    # リクエストに失敗したときを考慮する
    # 空配列だったときを考慮する
  end
end

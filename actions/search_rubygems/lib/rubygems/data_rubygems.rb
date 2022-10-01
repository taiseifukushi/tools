# frozen_string_literal: true

class DataRubygems
  require "json"

  def initialize(data)
    @data = JSON.parse(data)
  end

  def homepage_uri
    extract_github_uris
  end

  private

  def extract_github_uris
    @data.each_with_object([]) do |obj, arg|
      arg << obj["homepage_uri"]
      arg.compact
    end
  end
end

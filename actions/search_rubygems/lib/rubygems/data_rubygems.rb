# frozen_string_literal: true

class DataRubygems
  require "json"
  require "pry"

  MAX_NOTIFY_GEM_NUMBER = 5

  def initialize(data)
    @datum = JSON.parse(data)
  end

  def homepage_uris
    shift_extract_github_uris
  end

  private

  def shift_extract_github_uris
    extract_github_uris.shift(MAX_NOTIFY_GEM_NUMBER)
  end

  def extract_github_uris
    urls = @datum.each_with_object([]) do |obj, arg|
      arg << obj["homepage_uri"]
    end
    urls.compact.reject(&:empty?).uniq
  end
end

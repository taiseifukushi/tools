# frozen_string_literal: true

class MessageText
  require "./lib/rubygems/search_rubygems.rb"
  require "./lib/rubygems/data_rubygems.rb"

  def messages
    messages = []
    homepage_uri.each_with_object({}) do |obj, arg|
      arg["type"]  = "uri"
      arg["label"] = "こんなライブラリを見つけました"
      arg["uri"]   = obj
      messages     << arg
    end
    messages
  end

  private

  def homepage_uri
    DataRubygems.new(get_rubygems).homepage_uri
  end

  def get_rubygems
    SearchRubygems.new.get_rubygems
  end
end

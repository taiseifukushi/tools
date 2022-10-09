# frozen_string_literal: true

class MessageText
  require_relative "rubygems/search_rubygems.rb"
  require_relative "rubygems/data_rubygems.rb"
  require "pry"

  def initialize
    @datum = DataRubygems.new(get_rubygems).homepage_uris
  end

  def messages
    messages = []
    @datum.each do |data|
      _message            = {}
      _message["message"] = data
      messages            << _message
    end
    messages
  end

  private

  def get_rubygems
    SearchRubygems.new.get_rubygems
  end
end

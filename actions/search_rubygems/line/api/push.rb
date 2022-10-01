# frozen_string_literal: true

class Push
  require "line/bot"
  require "dotenv"
  require "./lib/message_text.rb"
  
  Dotenv.load

  def execute
    push
  end

  private
  
  def push
    client = Line::Bot::Client.new do |config|
      config.channel_secret = ENV["LINE_CHANNEL_SECRET"]
      config.channel_token = ENV["LINE_CHANNEL_TOKEN"]
    end
    messages.each do |message|
      client.push_message(ENV["LINE_USER_ID"], message)
    end
  # rescue
    # Todo: 例外処理
  end

  def messages
    MessageText.new.messages
  end
end

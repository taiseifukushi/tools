# frozen_string_literal: true

class Push
  require "line/bot"
  require "dotenv"
  require_relative "../../lib/message_text.rb"

  PUSH_RETRY_TIMES = 3

  Dotenv.load

  def execute
    push
  end

  private

  def client
    Line::Bot::Client.new do |config|
      config.channel_secret = ENV["LINE_CHANNEL_SECRET"]
      config.channel_token = ENV["LINE_CHANNEL_TOKEN"]
    end
  end
  
  def push
    retry_times ||= 0
    messages.each do |message|
      client.push_message(ENV["LINE_USER_ID"], message)
    end
  rescue Line::Bot::API::Error => e
    retry_times += 1
    retry if retry_times <= PUSH_RETRY_TIMES
  end

  def messages
    MessageText.new.messages
  end
end

# frozen_string_literal: true

class Push
  # require_relative "../../lib/message_text.rb"
  require_relative "./api/line_notify.rb"

  include LineNotify

  def execute
    messages.each do |message|
      p post(post_data: message)
    end
  end

  private

  def messages
    MessageText.new.messages
  end
end

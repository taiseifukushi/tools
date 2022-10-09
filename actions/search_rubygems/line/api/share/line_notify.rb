module LineNotify
  # https://notify-bot.line.me/doc/ja/
  # POST https://notify-api.line.me/api/notify

  require "net/http"
  require "uri"
  require "dotenv"
  require "json"
  require "pry"

  Dotenv.load

  PUSH_RETRY_TIMES = 3

  def post(post_data:)
    retry_times ||= 0

    uri = URI.parse(ENV["LINE_NOTIFY_API_URL"])
    header = {
      "Authorization" => "Bearer #{ENV["LINE_NOTIFY_ACCESS_TOKEN"]}"
    }

    Net::HTTP.post(uri, URI.encode_www_form(post_data), header)
  rescue StandardError => e
    retry_times += 1
    retry if retry_times <= PUSH_RETRY_TIMES  
  end
end
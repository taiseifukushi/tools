module LineNotify
  # https://notify-bot.line.me/doc/ja/
  # POST https://notify-api.line.me/api/notify

  require "net/http"
  require "uri"
  require "dotenv"
  require "json"

  Dotenv.load

  PUSH_RETRY_TIMES = 3

  def post(post_data:)
    retry_times ||= 0

    uri = URI.parse(ENV["LINE_NOTIFY_API_URL"])
    http = Net::HTTP.new(uri.host, uri.port)

    # request = Net::HTTP::Post.new(uri.request_uri)
    header["Authorization"] = "Bearer #{ENV["LINE_NOTIFY_ACCESS_TOKEN"]}"

    # header = {
    #   "Authorization" => "Bearer #{ENV["LINE_NOTIFY_ACCESS_TOKEN"]}"
    # }

    response = http.post(uri.path, post_data.to_json, header)

    # uri = URI.parse(ENV["LINE_NOTIFY_API_URL"])
    # http = Net::HTTP.new(uri.host, uri.port)

    # request = Net::HTTP::Post.new(uri.request_uri)
    # request["Authorization"] = "Bearer #{ENV["LINE_NOTIFY_ACCESS_TOKEN"]}"
    # request.body = post_data.to_json

    # response = http.request(request)
  rescue StandardError => e
    retry_times += 1
    retry if retry_times <= PUSH_RETRY_TIMES  
  end
end
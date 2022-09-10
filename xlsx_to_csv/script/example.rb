require_relative "./require"
require "optparse"

option = OptionParser.new
option.on("--t VAL") {|v| p v }
option.parse!(ARGV)

target_excel_path = ARGV[0]
xlsx = Roo::Excelx.new(target_excel_path) # => data/base/test.xlsx:1: Invalid char `\x03' in expression
xlsx = Roo::Spreadsheet.open(target_excel_path)

time = Time.now
current_time = "#{time}".split.shift(2).join("").gsub(/-/, "").gsub(/:/, "")
output_file_path = "data/output/test_#{current_time}.csv"

# sheetが複数ある場合はどうする？

xlsx.to_csv(output_file_path) # https://www.rubydoc.info/gems/roo/2.2.0/Roo%2FBase:to_csv

# ARGV[0]: 読み取り対象のエクセルファイルのパス
# ARGV[1]: 書き出し先のCSVファイルのパス
# bundle exec ruby script/example.rb data/base/test.xlsx data/output/test.csv
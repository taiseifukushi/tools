require_relative "./require"
require "optparse"

# https://docs.ruby-lang.org/ja/latest/class/OptionParser.html
# option = OptionParser.new
# option.on("-t VAL")
# option.parse!(ARGV)

params = {}
OptionParser.new do |opt|
  opt.on("-t Path of the Excel file to be read", "--target"){|v| params[:target] = v}
  opt.parse!(ARGV)
end

target_excel_path = params[:target]
xlsx = Roo::Excelx.new(target_excel_path) # => data/base/test.xlsx:1: Invalid char `\x03' in expression
xlsx = Roo::Spreadsheet.open(target_excel_path)

time = Time.now
current_time = "#{time}".split.shift(2).join("").gsub(/-/, "").gsub(/:/, "")
output_file_path = "data/output/test_#{current_time}.csv"

# sheetが複数ある場合はどうする？

xlsx.to_csv(output_file_path) # https://www.rubydoc.info/gems/roo/2.2.0/Roo%2FBase:to_csv

# bundle exec ruby script/example.rb data/base/test.xlsx data/output/test.csv
# Open Data Catalog

## 概要

```ruby
require 'rss'
rss = nil
begin
  rss = RSS::Parser.parse(rss_source)
rescue RSS::InvalidRSSError
  rss = RSS::Parser.parse(rss_source, false)
end
```

# memo

参考リンク
- https://qiita.com/youcune/items/fcfb4ad3d7c1edf9dc96
- https://qiita.com/yamazon/items/563af1b485ff413d381f
- https://zenn.dev/satohjohn/scraps/f5d8c6f1f57352
- https://swfz.hatenablog.com/entry/2019/07/07/035341
- https://www.opentone.co.jp/ot-lab/all/web-system/shellscript-xml

## JSON中の変数展開

こういうふうにもかける

```bash
curl -v -X POST $url \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $line_accsess_token" \
    -d @- <<EOS
{
    "to": "$line_user_id",
    "messages": [
        {
            "type":"text",
            "text":"Hello, world1"
        },
        {
            "type":"text",
            "text":"Hello, world2"
        }
    ]
}
EOS
```

## .envファイルの読み込み

source .env


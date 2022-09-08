# xlsx_to_csv

xlsxファイルをcsvに変換する

## 利用するライブラリ
~~[rubyXL](https://github.com/weshatheleopard/rubyXL_)~~

[Roo](https://github.com/roo-rb/roo)

## やりたいこと
- [ ] xlsxファイルをcsvに変換できる
    - [ ] 読み込んだxlsxファイルから、書き出したい列、行を指定できる
    - [ ] Web画面で選択できたら嬉しい

## 使い方
- ARGV[0]: 読み取り対象のエクセルファイルのパス
- ARGV[1]: 書き出し先のCSVファイルのパス

```sh
bundle exec ruby script/example.rb <read_xlsx_file_path> <output_csv_file_path>
```

example:
```sh
bundle exec ruby script/example.rb data/base/test.xlsx data/output/test.csv
```

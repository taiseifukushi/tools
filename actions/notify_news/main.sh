#!/bin/sh
# ============
# $ ./main.sh
# ============

set -eu

# ========== VARIABLES ==========
DIR_NAME="tmp"
RSS_URL="https://husita-h.github.io/rss_feed_builder/rss_feed.xml"
DATE="`date +'%Y%m%d%H%M'`"
SAVE_RSS_FILE_NAME="news-${DATE}.rss"
SAVE_RSS_FILE_PATH="${DIR_NAME}/${SAVE_RSS_FILE_NAME}"
# source ./.env
# ===============================

curl $RSS_URL -s -o $SAVE_RSS_FILE_PATH
ls ./tmp | grep -v -E $SAVE_RSS_FILE_NAME | xargs -I FILE_NAME echo tmp/FILE_NAME | xargs rm
echo "Save to $SAVE_RSS_FILE_PATH"

# 非対話モードで取得
links=`echo "cat rss/channel/item/link" | xmllint --shell $SAVE_RSS_FILE_PATH`

function line_notify(){
    echo $1 | sed -e 's/<[^>]*>//g' | xargs -I MESSAGE \
    curl -X POST $LINE_NOTIFY_API_URL_NOTIFY_NEWS \
        -H "Authorization: Bearer $LINE_NOTIFY_ACCESS_TOKEN_NOTIFY_NEWS" \
        -F "message=MESSAGE"
}

for link in $links
do
    line_notify $link
done

echo "Success to post news"

#!/usr/bin/env bash

set -euo pipefail

### Var definition

CHANNEL_ID="${CHANNEL_ID:?CHANNEL_ID env var required}"
FEED_URL="https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}"
LIMIT=3

XML_FEED_FILE='data/feed.xml'
OUT_JSON_FILE='data/last-3-tty-videos.json'

### Script start

curl --silent "$FEED_URL" --output $XML_FEED_FILE

XML_ENTRY="//*[local-name()='entry']"

# Loop over entry indices and pull each field with local-name() to dodge namespace prefixes
COUNT=$(xmllint --xpath "count($XML_ENTRY)" $XML_FEED_FILE)
COUNT=$((COUNT < LIMIT ? COUNT : LIMIT))

ENTRIES="[]"

for i in $(seq 1 "$COUNT"); do
  TITLE=$(xmllint --xpath "string(${XML_ENTRY}[$i]/*[local-name()='title'])" $XML_FEED_FILE)
  VIDEO=$(xmllint --xpath "string(${XML_ENTRY}[$i]/*[local-name()='videoId'])" $XML_FEED_FILE)
  THUMB=$(xmllint --xpath "string(${XML_ENTRY}[$i]//*[local-name()='thumbnail']/@url)" $XML_FEED_FILE)

  ENTRIES=$(jq \
    --arg title "$TITLE" \
    --arg videoId "$VIDEO" \
    --arg link "https://www.youtube.com/watch?v=${VIDEO}" \
    --arg thumbnail "$THUMB" \
    '. + [{title: $title, videoId: $videoId, link: $link, thumbnail: $thumbnail}]' \
    <<<"$ENTRIES")
done

echo "$ENTRIES" | jq '.' >"$OUT_JSON_FILE"

echo "Wrote $COUNT videos to $OUT_JSON_FILE"

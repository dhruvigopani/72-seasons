# Install

Takes about a minute. iPhone or iPad, iOS 16 or later for the Lock Screen widgets.

## 1. Get Scriptable

Install [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) from the App Store. It's free and runs small JavaScript files as widgets.

## 2. Add the script

1. Open [`72-Seasons.js`](../72-Seasons.js) on GitHub and tap **Raw**.
2. Select all and copy.
3. Open Scriptable, tap **+** in the top right, and paste.
4. Tap the title at the top and rename it **72 Seasons**.
5. Tap **Done**.

To check it worked, tap the script once. A preview of the medium widget opens.

## 3. Add a Home Screen widget

1. Long press an empty spot on your Home Screen until the apps jiggle.
2. Tap **Edit** (top left), then **Add Widget**.
3. Search for **Scriptable**, pick a size (small, medium or large), and tap **Add Widget**.
4. Long press the new widget and tap **Edit Widget**.
5. Set **Script** to **72 Seasons**. Leave **When Interacting** as it is.

## 4. Add a Lock Screen widget (optional)

1. Long press the Lock Screen and tap **Customize**, then **Lock Screen**.
2. Tap the widget row under the clock (rectangular) or the line above it (inline).
3. Add **Scriptable**, tap it, and set **Script** to **72 Seasons**.

## Updating

Copy the new version of `72-Seasons.js` and replace everything in the Scriptable script. Your widgets update on their own.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Widget says "Select script in widget configurator" | Long press it, **Edit Widget**, and choose **72 Seasons** as Script. |
| Widget is blank or shows an error | Open the script in Scriptable and make sure you pasted all of it, from the first comment to `Script.complete();` at the end. |
| Kanji show as boxes | Your device is missing the Hiragino Mincho font. This is rare on iOS. Open an issue with your iOS version. |
| It still shows yesterday's season | iOS decides when widgets refresh. The script asks for a refresh just after midnight, but iOS can delay it. Opening Scriptable usually nudges it. |
| Text looks cramped on some days | Scriptable can't measure text, so the layout estimates line breaks. Open an issue with a screenshot and the date. |

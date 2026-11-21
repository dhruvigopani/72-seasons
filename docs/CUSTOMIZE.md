# Customize

All changes are made in the Scriptable editor. Your widgets pick them up on the next refresh.

## Change a cue

Find `const CUES` near the top. Each line is one micro-season, in order from No. 1 (Feb 4). Each has six cues, one per day.

```js
["Look for flowers still blooming in the cold.", "Go to bed a little earlier tonight.", ...],
```

Tips for cues that read well in the widget:
- Keep them under about 55 characters.
- Start with a verb ("Look for", "Eat", "Call") or a plain observation.
- No labels. The cue should explain itself.

## Change the colors

Find `const PALETTE`. Each row is one season, in order spring, summer, autumn, winter:

```js
["#34506B", "#1B2A3B", "#AFC6DB", "#C9DAEA"]  // top, bottom, branch tint, accent
```

Keep text readable: the cream text (`INK`, `#F3EEE4`) needs a dark enough gradient. Aim for a contrast ratio of 4.5:1 or more against both the top and bottom colors.

## Tone down or remove the branch

In the `small`, `medium` and `large` functions, find the `branch(...)` call. To make it fainter, add or lower a sixth argument, its strength from 0 to 1. For example, `branch(ctx, W + 8, H + 10, 0.9, -Math.PI * 0.76, 0.5)`. To remove it, delete the line.

## Fix a start date

Start dates are fixed in `KO` as `[month, day, ...]`. If a year's real date differs, edit the month and day for that micro-season.

## Fonts

- Titles: `Georgia-Italic` (`SERIF_I`)
- Kanji: `HiraMinProN-W3` (`MINCHO`)

Any font installed on iOS works. Use its PostScript name.

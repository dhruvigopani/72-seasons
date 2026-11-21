# Contributing

Thanks for helping. Small, focused changes are easiest to review.

## Good ways to help

- **Better cues.** A cue that fits its season better, is clearer, or works outside Japan. Use the "Cue suggestion" issue template, or open a pull request that edits `CUES` in `72-Seasons.js` and the matching row in `data/cues.csv`.
- **Bug reports.** Layout problems, wrong dates, errors. Include your iOS version, the widget size, the date, and a screenshot.
- **Translations.** Open an issue first so we can agree on how to structure them.
- **Android.** If you've built widgets with KWGT, Widgy or a native Android app and want to help, open an issue.

## Cue style

- One sentence or two short ones, under about 55 characters.
- Starts with a verb or a plain observation. No labels.
- Something to do, notice or eat, matched to the micro-season.
- Calm and kind. No guilt, no streaks, no "you should".
- No em dashes.

## Code style

- One file, no dependencies, no network calls.
- Plain JavaScript that runs in Scriptable.
- Comment the "why", not the "what".

## Before opening a pull request

1. Paste your version into Scriptable and check the small, medium and large widgets.
2. If you changed data, update `data/seasons.json` and `data/cues.csv` too.
3. Add a line to `CHANGELOG.md` under "Unreleased".

# How it works

One file, `72-Seasons.js`, with no network calls and no dependencies beyond Scriptable.

## Data

Three arrays at the top of the script:

- **`KO`**: the 72 micro-seasons as `[month, day, kanji, romaji, english]`, in calendar order from Risshun (Feb 4).
- **`SEKKI`**: the 24 major seasons as `[kanji, romaji, english]`. Major season `n` covers micro-seasons `3n` to `3n + 2`.
- **`CUES`**: six cues per micro-season. Day 6 is used only in six-day seasons.

The same data is in [`data/seasons.json`](../data/seasons.json) and [`data/cues.csv`](../data/cues.csv).

## Finding today

The script builds start dates for every micro-season across last year, this year and next year, sorts them, and picks the latest start on or before today. That handles the year boundary (Dec 31 to Jan 5) without special cases. From there:

- **Day of the season:** days since the start, plus one.
- **Length:** days until the next start (4 to 6).
- **Cue:** `CUES[season][min(day, 6) - 1]`.

## Color

Each of the four seasons has a palette: gradient top, gradient bottom, botanical tint and accent.

| Season | Top | Bottom |
| --- | --- | --- |
| Spring | `#8A4660` | `#4F2235` |
| Summer | `#3E6347` | `#1F3526` |
| Autumn | `#9A5430` | `#5A2A14` |
| Winter | `#34506B` | `#1B2A3B` |

Position in the year runs from 0 to 4, one unit per season. A season holds its color for the first two thirds, then eases into the next with a smoothstep curve over the last third (about a month). Blending all season long made the in-between colors muddy.

## Drawing

Small, medium and large widgets are drawn into a `DrawContext` and set as the widget's background image:

1. A diagonal gradient made of 60 bands.
2. Fine grain: a few thousand tiny light and dark specks.
3. A botanical branch, drawn recursively, that bleeds off a corner. Its shape is seeded by the micro-season, so it changes every few days. Its style follows the season: blossoms, leaves, turning leaves or bare buds.
4. Text and day dots.

Lock Screen widgets use plain `ListWidget` text so iOS can tint them.

## Text layout

Scriptable can't measure text. The script estimates widths from character count and simulates word wrapping, then:

- shrinks a title until its longest word fits on one line
- caps titles and cues at two or three lines
- stops adding rows on the large widget when the next one would overflow

The estimates err on the safe side, so some days have a little extra space.

## Large widget

Shows today's cue, then cues for the next three days. When a new micro-season starts inside those three days, a labeled divider marks where it begins.

## Refresh

The widget asks iOS to refresh just after the next midnight. iOS decides the exact timing.

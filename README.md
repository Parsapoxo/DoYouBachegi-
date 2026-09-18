# Do You Bachegi?

A tiny site for tracking which animated movies your friend group has actually seen.
Click a poster to mark it as watched — everyone else sees who's watched what.

## Deploying on GitHub Pages

1. Create a new GitHub repo and push these files to it: `index.html`, `style.css`, `app.js`, `CHANGELOG.md`, and the `avatars/` and `posters/` folders (see below for what goes in them).
2. In the repo, go to **Settings > Pages**, set the source to the branch you pushed (usually `main`) and root folder, then save.
3. GitHub will give you a live URL like `https://<your-username>.github.io/<repo-name>/`.

The Supabase URL and key are already filled in inside `app.js`, so no extra setup is needed there.

## Avatars folder (`avatars/`)

Upload up to **35** images named `avatar1.png` through `avatar35.png`. They're shown in a 7-column × 5-row grid, in numeric order, left to right / top to bottom, on the sign-up screen. If you upload fewer than 35, the rest just won't show up — that's fine.

## Posters folder (`posters/`)

Upload one image per movie, using the exact filenames below (all `.png`). If your image is a different format, just rename it to end in `.png` (browsers don't actually check the file's real format from the extension) — or tell me and I'll switch the code to look for `.jpg` instead.

### Walt Disney Animation Studios

**The Lion King:** `lionking1.png`, `lionking2.png`, `lionking3.png`, `lionking4.png`
**Aladdin:** `aladdin1.png`, `aladdin2.png`, `aladdin3.png`
**Zootopia:** `zootopia1.png`, `zootopia2.png`
**Moana:** `moana1.png`, `moana2.png`

### Pixar

**Monsters, Inc.:** `monstersinc1.png`, `monstersinc2.png`
**The Incredibles:** `incredibles1.png`, `incredibles2.png`
**Toy Story:** `toystory1.png`, `toystory2.png`, `toystory3.png`, `toystory4.png`, `toystory5.png`
**Finding Nemo:** `findingnemo1.png`, `findingnemo2.png` (Nemo, then Dory)
**Cars:** `cars1.png`, `cars2.png`, `cars3.png`
**Inside Out:** `insideout1.png`, `insideout2.png`

### DreamWorks Animation

**Shrek:** `shrek1.png`, `shrek2.png`, `shrek3.png`, `shrek4.png`
**Puss in Boots:** `pussinboots1.png`, `pussinboots2.png`
**Madagascar:** `madagascar1.png`, `madagascar2.png`, `madagascar3.png`, `madagascar4.png` (4th is *Penguins of Madagascar*)
**How to Train Your Dragon:** `httyd1.png`, `httyd2.png`, `httyd3.png`
**Kung Fu Panda:** `kungfupanda1.png`, `kungfupanda2.png`, `kungfupanda3.png`, `kungfupanda4.png`
**The Croods:** `croods1.png`, `croods2.png`

### Illumination

**Despicable Me:** `despicableme1.png`, `despicableme2.png`, `despicableme3.png`, `despicableme4.png`
**Minions:** `minions1.png`, `minions2.png`, `minions3.png`
**The Secret Life of Pets:** `secretlifeofpets1.png`, `secretlifeofpets2.png`
**Sing:** `sing1.png`, `sing2.png`

### Blue Sky Studios

**Ice Age:** `iceage1.png`, `iceage2.png`, `iceage3.png`, `iceage4.png`, `iceage5.png`
**Rio:** `rio1.png`, `rio2.png`

### Sony Pictures Animation

**Hotel Transylvania:** `hoteltransylvania1.png`, `hoteltransylvania2.png`, `hoteltransylvania3.png`, `hoteltransylvania4.png`
**The Angry Birds Movie:** `angrybirds1.png`, `angrybirds2.png`
**Cloudy with a Chance of Meatballs:** `cloudy1.png`, `cloudy2.png`

### Other Studios

**The Addams Family:** `addamsfamily1.png`, `addamsfamily2.png`

### Others (single-installment movies)

`up.png`, `walle.png`, `ratatouille.png`, `beemovie.png`, `coco.png`, `megamind.png`

## Notes on the movie list

- Franchises include every installment released so far, including a few 2025/2026 releases (*Zootopia 2*, *Toy Story 5*, *Minions 3*).
- **Shrek 5** and **Despicable Me 5**-type not-yet-released sequels were left out since they haven't come out yet — easy to add later once they're out.
- Want more movies added later? Just tell me the names and I'll add them (and tell you the poster filenames to upload).

## Updating the version

`app.js` has an `APP_VERSION` constant at the top, and the corner badge reads from it. Whenever you make a change:
1. Bump `APP_VERSION` (e.g. `1.0.0` → `1.1.0` for a new feature, `1.0.1` for a small fix).
2. Add a new entry at the top of `CHANGELOG.md` describing what changed.

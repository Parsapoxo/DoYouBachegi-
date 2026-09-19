# Do You Bachegi?

A tiny site for tracking which animated movies your friend group has actually seen.
Click a poster to mark it as watched — everyone else sees who's watched what.

## Deploying on GitHub Pages

1. Create a new GitHub repo and push these files to it: `index.html`, `style.css`, `app.js`, `CHANGELOG.md`, and the `avatars/` folder (see below for what goes in it).
2. In the repo, go to **Settings > Pages**, set the source to the branch you pushed (usually `main`) and root folder, then save.
3. GitHub will give you a live URL like `https://<your-username>.github.io/<repo-name>/`.

The Supabase URL/key and the OMDb API key are already filled in inside `app.js`, so no extra setup is needed there.

## Avatars folder (`avatars/`)

Upload up to **35** images named `avatar1.png` through `avatar35.png`. They're shown in a 7-column × 5-row grid, in numeric order, left to right / top to bottom, on the sign-up screen. If you upload fewer than 35, the rest just won't show up — that's fine.

## Posters

Posters are fetched automatically from [OMDb](https://www.omdbapi.com/) by movie title — no downloading or uploading needed. The first time each poster loads it's cached in the browser (`localStorage`), so repeat visits are instant and don't re-hit the API.

If a title is too new or obscure for OMDb to have a poster for (this can happen right after a movie's release), that poster shows a small 🎬 placeholder instead — it'll usually start working once OMDb's database catches up, no action needed on your side. If a specific one stays broken for a while, tell me the movie and I can adjust how it's searched.

## Notes on the movie list

- Franchises include every installment released so far, including a few 2025/2026 releases (*Zootopia 2*, *Toy Story 5*, *Minions 3*).
- **Shrek 5** and **Despicable Me 5**-type not-yet-released sequels were left out since they haven't come out yet — easy to add later once they're out.
- Want more movies added later? Just tell me the names and I'll add them — posters show up automatically, nothing to upload.

## Updating the version

`app.js` has an `APP_VERSION` constant at the top, and the corner badge reads from it. Whenever you make a change:
1. Bump `APP_VERSION` (e.g. `1.2.0` → `1.3.0` for a new feature, `1.2.1` for a small fix).
2. Add a new entry at the top of `CHANGELOG.md` describing what changed.

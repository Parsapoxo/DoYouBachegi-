# Changelog

All notable changes to **Do You Bachegi?** are documented here.
This project follows [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH).

## [1.2.0] - 2026-09-18

### Changed
- Posters are now fetched automatically from OMDb (same API key used in Orach) by movie title, instead of needing to be manually downloaded and uploaded to a `posters/` folder.
- Posters are cached in the browser after first load, so they don't re-fetch on every visit.
- A movie shows a small 🎬 placeholder if OMDb doesn't have a poster for it yet.

## [1.1.0] - 2026-09-18

### Fixed
- Login and Sign up forms no longer overlap on screen (a CSS bug made the "hidden" one still show).

### Changed
- Removed all custom fonts — the site now just uses the browser's default system font.
- Single-installment movies (e.g. Megamind, Coco) now live in an "Others" sub-section inside their own studio, instead of one giant global "Others" section.
- Sign-up avatar picker is now a single circular button (with a pencil icon on hover) that opens the avatar grid when clicked, instead of always showing the full grid.

## [1.0.0] - 2026-09-18

### Added
- Initial release of the site.
- Username/password accounts via Supabase Auth (backed by a fake-email trick under the hood).
- Avatar picker (7×5 grid) shown at signup.
- Movie board grouped by studio, then by franchise, with all installments listed per franchise.
- "Others" section for single-installment movies.
- Click-to-toggle "watched" state per poster, synced live via Supabase.
- Shows which other users have watched each movie.
- Version badge in the corner, driven by `APP_VERSION` in `app.js`.

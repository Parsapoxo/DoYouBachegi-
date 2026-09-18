# Changelog

All notable changes to **Do You Bachegi?** are documented here.
This project follows [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH).

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

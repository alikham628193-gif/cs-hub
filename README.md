# CS2 HUB — Nebula redesign

A personal Counter-Strike 2 esports portal with an original neon-broadcast visual identity, animated launch sequence, responsive score-centre layout, and data-driven match/team/player/ranking/event sections.

## Deploy on Netlify
- Publish directory: `.`
- Functions directory: `netlify/functions`
- Add `CITO_API_KEY` under Netlify Site configuration → Environment variables.
- Redeploy after setting the variable. Never put the secret API key in `index.html` or a public repository.

## Live data and limitations
- The site requests live/upcoming/recent matches, world and VRS rankings, teams, player rating leaderboard, and live events through `netlify/functions/cs2.js`.
- The UI refreshes live matches, rankings and events every 60 seconds while the tab is visible.
- The provider must support the configured endpoints and the API key must have access. If the API returns an error or an unsupported response shape, the page shows an error instead of inventing live results.
- This package cannot guarantee a real-time feed until a valid API key and working provider access are configured.
- Steam news is loaded from the public Steam news endpoint. Background photography and Google Fonts require an internet connection.
- `cs2-background.mp4` and `dust2-hero.jpg` should remain beside `index.html` when deploying.

## Design features
- Cinematic launch reveal with a skip button and reduced-motion support.
- Nebula palette, condensed display typography, glassy match panels, animated team ticker and hero effects.
- “HUB SIGNAL” connection indicator reflects the API response state; its decorative waveform is visual only, not fabricated match telemetry.
- Searchable teams, players and events, rankings, favorites, local profile, language selector and responsive mobile layout.
- Original branding; not affiliated with HLTV.

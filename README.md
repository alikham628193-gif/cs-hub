# CLUTCH — CS2 + PandaScore

## Deploy to Netlify
1. Upload this project folder/repository to GitHub, or drag the ZIP contents into a new Netlify site.
2. In Netlify, open **Site configuration → Environment variables**.
3. Add `PANDASCORE_API_KEY` with the token from your PandaScore dashboard.
4. Trigger a new deploy. Do not put the token in `index.html` or share it publicly.

## What this project connects
- Running and upcoming CS2 matches
- Running and upcoming tournaments
- Teams
- Players
- Live match section

The API token is read only by `netlify/functions/pandascore.mjs`, not exposed to the browser. Data availability depends on PandaScore plan permissions, endpoint access, rate limits, and API coverage. If PandaScore denies an endpoint, the page shows an error instead of inventing live data.

## Note
The supplied HTML contains a bundled video and a visual prototype. The new API layer replaces the demo match/tournament/team/player lists once a token is configured. The original design is retained.

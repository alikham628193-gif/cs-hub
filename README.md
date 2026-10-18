# CS2 HUB

Static CS2 esports dashboard with a Netlify Function proxy for Cito API.

## Deploy
- Netlify build publish directory: `.`
- Functions directory: `netlify/functions`
- Add `CITO_API_KEY` under Netlify environment variables. Never put the real key in HTML, GitHub, or `.env` committed to the repository.
- Redeploy after changing environment variables.

## Notes
- The player cards use portrait/image URLs if the API returns them. If the API does not provide images, a stylized animated fallback avatar is shown.
- The site cannot show live scores, official player photos, or stats until the API key and supported endpoints return those fields.


## Premium visual refresh
- Animated championship ticker and cinematic esports panels.
- Responsive layouts for desktop, tablet and mobile.
- Subtle motion effects with reduced-motion accessibility support.
- Live matches, rankings and events refresh every 60 seconds while the page is visible.
- API-powered facts remain dependent on Cito API availability and the `CITO_API_KEY` Netlify environment variable.
- Decorative background photography is loaded from Unsplash and therefore requires an internet connection.

## UI update: quick navigation and languages
- Added a visible Quick Access dashboard for Matches, Rankings, Teams, Players, Events, News and Settings.
- Added instant language switching for Russian, English, Kazakh, Spanish, Portuguese and Chinese. The selected language is saved in the current browser.
- Added language settings to the account/personalization area and a compact language selector in the header.
- Navigation and main section labels are translated locally; API-powered match/team/player data still depends on the configured data provider and some provider/error text may remain in its source language.


Cinematic update: the main hero uses the provided CS2 gameplay video (`cs2-background.mp4`) as a muted, looping, inline background. Keep this video file beside `index.html` when deploying. The hero has subtle camera drift, lighting overlay, and scan-line effects; reduced-motion preferences are respected.

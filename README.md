# Profile card

An implementation of the [Frontend Mentor profile card component challenge](https://www.frontendmentor.io/challenges/profile-card-component-cfArpWshJ), using its supplied portrait, background patterns, copy and design references.

The card is static presentation: no account, follow action, client state or data storage. It renders fully with JavaScript disabled.

## Development

Node 22.13 or later. Use `npm ci`, `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`. Browser tests use installed Chrome and own port 4526.

Next 16.3.6, React 19.2.8, TypeScript 5.9.3 and Tailwind 4.2.1 are pinned to the family baseline. The page is a server component.

## Sources

Original challenge files are preserved under `reference/`; supplied images moved byte-for-byte to `public/images/`. Geometry, colors and type come from the decoded Figma frames (Desktop 1440 and Mobile 375). Kumbh Sans 400/700 is self-hosted at build time through `next/font/google`.

## Design decisions

- The design sets "London" at 14px and the stat labels at 10px. The family 16px text floor raises both to 16px; the stat labels keep a light tracking instead of the 1.5px spacing so all three columns fit at 375px.
- Stats are a description list (`dt` label, `dd` value) shown value-first with `column-reverse`, so screen readers hear "Followers, 80K".
- The age gets a visually hidden ", age" so the heading reads "Victor Crest, age 26".
- White attribution text on the teal background measured 3.1:1, so the footer uses a deep navy (5.7:1).
- Search identity: the site name "Profile card" appears in the footer, `og:site_name` and the `WebSite` JSON-LD. The canonical URL is the planned production domain `profile-card-component-fm.royeradames.com` (not yet attached).

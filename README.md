# Vijay Sonawane — Personal Portfolio

A fast, responsive, single-page portfolio site. No frameworks, no build step, no
dependencies — just HTML, CSS and vanilla JavaScript, so it loads instantly and
deploys anywhere.

## Run it

Open `index.html` in a browser, or serve it locally:

```bash
python -m http.server 5173     # then visit http://localhost:5173
# or
npx serve .
```

## Structure

```
index.html            All page content and sections
assets/css/styles.css Design tokens, layout, light/dark themes, responsive rules
assets/js/main.js     Theme toggle, mobile nav, typewriter, scroll reveal, counters
```

## Features

- Light and dark themes — follows the OS preference, remembers a manual choice
- Responsive from 320px up; mobile slide-down navigation
- Hero typewriter, scroll-reveal animations, animated stat counters
- Active-section highlighting in the navbar
- Accessible: skip link, focus rings, ARIA labels, `prefers-reduced-motion` support
- Print-friendly stylesheet

## Make it yours

Everything below is placeholder content written to sound right — **replace it with
your real details before sharing the site.**

| What | Where |
| --- | --- |
| Name, headline, intro copy | `index.html` — `.hero` section |
| Rotating tagline phrases | `assets/js/main.js` — the `phrases` array |
| Stats (years, projects, uptime) | `index.html` — `.about__stats`, `data-count` attributes |
| Skills and tech tags | `index.html` — `#skills` section |
| Projects, descriptions, links | `index.html` — `#work` section (`href="#"` placeholders) |
| Job titles, companies, dates | `index.html` — `#experience` timeline |
| GitHub / LinkedIn URLs | `index.html` — `.socials` list |
| Email address | `index.html` — `#contact` section and social list |
| Colours and spacing | `assets/css/styles.css` — the `:root` token block |

## Deploy

**GitHub Pages** — push to GitHub, then Settings → Pages → deploy from `main` / root.

**Netlify or Vercel** — drag the folder in, or connect the repo. No build command,
publish directory `.`.

# EduTech Institute — Website

A complete, responsive, production-ready **EduTech Institute** website built with **HTML5, CSS3 and Vanilla JavaScript** only. No Bootstrap, no Tailwind, no React. Ready for **GitHub Pages** deployment.

Premium blue & white university theme with editorial display type (Fraunces + Poppins), kinetic hero, smooth momentum scrolling (Lenis), scroll-reveal animations, animated counters, gallery lightbox, FAQ accordion and a validated contact form.

## Project Structure
```
EduTech-Institute/
├── index.html        # Home — hero, features, stats, manifesto, faculty, testimonials, CTA
├── about.html        # Story, mission, vision, objectives, values
├── courses.html      # 6 courses (image, desc, duration, fees), FAQ accordion
├── gallery.html      # Responsive masonry gallery with lightbox
├── contact.html      # Validated contact form, info cards, Google Map
├── css/
│   ├── style.css     # Design system, components, animations (CSS variables)
│   └── responsive.css# Breakpoints: 1080 / 820 / 560 + reduced-motion
├── js/
│   └── script.js     # Nav, drawer, reveal, counters, FAQ, lightbox, form, back-to-top
├── images/           # (uses optimized Unsplash CDN imagery)
└── README.md
```

## Features
- Sticky glassmorphism navigation + mobile hamburger drawer
- Kinetic hero with masked line-by-line reveal + pointer parallax
- Feature cards, animated statistics counters
- Numbered manifesto chapters, editorial marquee
- Course cards with duration & fees, FAQ accordion
- Faculty cards with social hover reveal
- Testimonials with star ratings
- Masonry gallery with keyboard-accessible lightbox
- Working contact form with client-side validation + success state
- Google Map embed, newsletter, back-to-top, footer

## Tech
HTML5 · CSS3 (Flexbox, Grid, CSS Variables) · Vanilla JavaScript · Font Awesome · Google Fonts (Poppins) · Lenis (smooth scroll)

## Run Locally
Open `index.html` directly, or serve the folder:
```bash
python3 -m http.server 8080
# visit http://localhost:8080
```

## Deploy to GitHub Pages
1. Push this folder to a GitHub repository.
2. Settings → Pages → Source: `main` branch → `/root`.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

All internal links are relative, so it works on GitHub Pages out of the box.

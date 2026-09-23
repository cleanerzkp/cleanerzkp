# Ślady światła / Traces of Light

A small bilingual digital museum exhibit prototype by Kacper Karbownik. It is a **portfolio demonstration**, not work delivered for a museum. All four object stories are fictional, and the exhibit images were generated for this project.

## What visitors can do

- Browse four objects and read a short interpretation of each.
- Move through the exhibit with standard keyboard controls and visible focus states.
- Read concise image alt text and an expandable, fuller text description for every object.
- Switch between Polish and English, enlarge text, or turn on a high contrast display.
- Use **Start again / Zacznij od nowa** to return a kiosk to its opening state.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Production build: `npm run build`; preview it with `npm run preview`.

## Accessibility notes

The interface uses semantic sections and headings, native buttons and links, a skip link, focus styles, language metadata, keyboard operable `<details>` descriptions, a status announcement after reset, reduced motion support, and a 320px responsive layout. Its content is available without audio. These are implementation choices, **not a claim of WCAG conformance or a formal audit**. Before institutional use, test with visitors, assistive technologies, the target kiosk hardware, and the institution’s own content and language requirements.

The typography requests DM Sans and Playfair Display from Google Fonts; system font fallbacks are provided when offline. The demo has no analytics or backend.

## Sample asset provenance

The lantern hero and four catalog object images were generated specifically for this fictional exhibit using OpenAI image generation. The UI design concept is in `design-concept.png`. No museum collection photography or external object records are included.

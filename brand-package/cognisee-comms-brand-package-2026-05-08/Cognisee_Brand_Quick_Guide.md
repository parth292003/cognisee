# Cognisee Brand Quick Guide

Prepared: 2026-05-08

## Positioning

Cognisee should feel sparse, serious, research-lab-grade, high-status, and intellectually precise. Avoid SaaS-like gradients, investor-deck clutter, generic AI iconography, and overexplained copy blocks.

Current public site:

- https://www.cognisee.ai

## Logo

Preferred logo:

- Horizontal symbol plus wordmark.
- Use the black transparent version on light backgrounds.
- Use the cream or white transparent version on dark green-black backgrounds.
- Keep generous clearspace.

Core files:

- `01-logos/current/cognisee-logo-horizontal-black-transparent-3000w.png`
- `01-logos/current/cognisee-logo-horizontal-cream-transparent-3000w.png`
- `01-logos/current/cognisee-logo-horizontal-white-transparent-3000w.png`

## Color

The Cognisee palette is green-black night mode and milky cream-green light mode.

### Night

| Token | Value | Use |
| --- | --- | --- |
| Background | `#091A11` | Main dark field |
| Background top | `#13231A` | Top glow / depth |
| Background bottom | `#07140E` | Lower depth |
| Text | `#F4EDE1` | Main text |
| Heading | `#F6EFE5` | Display headings |
| Accent | `#A6D4BD` | Links, quiet emphasis |
| Green accent | `#B7DE9D` | Selection, live accent |
| Amber | `#F1BE73` | Rare emphasis only |

### Light

| Token | Value | Use |
| --- | --- | --- |
| Background | `#F6F5EB` | Main light field |
| Background top | `#FBF9EF` | Milky highlight |
| Background bottom | `#EEF2E4` | Soft green depth |
| Text | `#1C2922` | Main text |
| Heading | `#142019` | Display headings |
| Accent | `#286F61` | Links, quiet emphasis |
| Green accent | `#577F67` | Secondary emphasis |
| Amber | `#9D6619` | Rare emphasis only |

Use `02-color/palette.css` and `02-color/palette.json` as implementation tokens.

## Typography

### Display

Newsreader

- Use for H1, H2, H3, major editorial headings.
- Recommended weight: 400.
- Recommended tracking: around `-0.03em` for large headings.

### Body

IBM Plex Sans

- Use for paragraphs, page body, descriptions, and most UI text.
- Recommended weights: 300, 400, 500, 600.

### Mono / Meta

IBM Plex Mono

- Use for navigation, eyebrow text, metadata, small technical labels.
- Recommended weights: 400, 500.
- Positive tracking is acceptable for all-caps metadata.

Web import:

```html
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap"
  rel="stylesheet"
/>
```

CSS variables:

```css
:root {
  --font-display: "Newsreader", "Source Serif 4", Georgia, serif;
  --font-body: "IBM Plex Sans", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, Monaco,
    Consolas, monospace;
}
```

## Tone

Use restrained, precise language. Cognisee is a frontier AI lab building cognitive infrastructure and Artificial Collective Intelligence. The visual tone should feel like a serious lab, not a product marketing site.

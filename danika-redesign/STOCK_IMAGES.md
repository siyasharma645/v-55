# Stock photography guide

Only electrical imagery is missing. Danika's own photos cover plumbing (water heater, drain cleaning, water lines,
service van, and five dated project photos). Everything shown as a Danika job on the site is a genuine photo from
danikaplumbing.com/projects/. Stock images must never be used there.

## Missing images
| Slot (`src/data/stock.json`) | Where used | Size | What to look for |
|---|---|---|---|
| `electricalPanel` | Electrical Services card header | 1600×700 | Electrician inspecting or working at a **residential** breaker panel (garage/utility room), natural light, real tools. Avoid staged smiles, hard hats on suburban interiors, or commercial switchgear. |

Optional, not currently used on the homepage but suggested for the electrical pages: EV charger on a home garage wall; whole-home generator beside a house; residential lighting install.

## Licensing rules
- Use only sources that allow commercial use without attribution headaches: Unsplash, Pexels, Pixabay (their own licences), or a paid library such as Adobe Stock / Shutterstock.
- Keep the licence/receipt. Record photographer + source in the slot's `credit` field.
- No identifiable people with model-release concerns unless the library confirms a release. No visible third-party brands/logos (or other electricians' company names on uniforms or vans).
- Avoid anything that implies a Danika job, uniform or vehicle.

## Workflow
1. Download the original, save as `assets/stock-originals/electrician-breaker-panel.jpg`.
2. `npm run images:stock` → crops and writes `public/images/stock/electrician-breaker-panel.webp`.
3. Set `"credit"` in `src/data/stock.json`.
4. The site automatically adds a visible label: "Stock photo · not a Danika project". Until the file exists, a branded placeholder is shown (no broken image).

## Current status
`electricalPanel` is filled with a supplied residential breaker-panel image (a Danika-style uniform logo was retouched out because
it did not match the official brand). It is labelled "Illustrative image · not a Danika project" via `label` in `src/data/stock.json`.
Swap it for a real photo of your own electrician at any time: replace `assets/stock-originals/electrician-breaker-panel.png`,
run `npm run images:stock`, and change `label`/`credit`.

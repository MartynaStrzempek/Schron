# Lighthouse Report

1. **LCP (Largest Contentful Paint)**
   - When the main/hero content becomes visible.
   - Target: **≤ 2.5s**
   - If slow: usually images, SSR/data fetching, fonts, or render-blocking resources.

2. **CLS (Cumulative Layout Shift)**
   - Whether the layout “jumps” while loading.
   - Target: **≤ 0.1**
   - If high: missing image sizes, late-loaded components, font swapping, banners/ads.

3. **INP / TBT (Interaction responsiveness / Total Blocking Time)**
   - How quickly the page reacts to user input (clicks, typing).
   - If bad: too much JS on startup, large bundles, heavy components, long tasks.

4. **Opportunities/Diagnostics (biggest time savings)**
   - Focus on the top 2–3 items with the largest “ms saved”, e.g.:
     - Reduce unused JavaScript
     - Properly size images
     - Serve images in next-gen formats
     - Eliminate render-blocking resources

5. **Total page weight & requests**
   - Check in the Network tab - the best option
   - How many KB/MB and requests are needed for the initial view.
   - If large: LCP and INP usually suffer — optimize assets and split code.


## Main page - mobile

1. **LCP**
   - Time: **3.9s**
   - Element: **hero image**
   - How to handle:
     - <picture> with <source> with `srcset` + `sizes` attributes
     - change format for AVIF/WebP
     - add to <img> fetchpriority="high"
     - add `Cache-Control: public, max-age=2592000` (1 month)

2. **CLS**
   - Time: **0.029**
   - Element: **hero image**
   - How to handle:
     - set size of <img> when image is loading

3. **INP** OK, **TBT** OK

4. **Diagnostics**
   - fonts - add locally, cache and add `font-display: swap`
   - images - add cache (only for hero, when images will be on the server then cache will be applied)

5. **Total page weight & requests** OK
   - Small transfer 1.4 MB

## Animal details - mobile

## Main page - desktop

## Animal details - desktop
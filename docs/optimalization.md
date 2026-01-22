# Lighthouse Report — Top 5 Things to Check

1. **LCP (Largest Contentful Paint)**
   - When the main/hero content becomes visible.
   - Target: **≤ 2.5s**
   - If slow: usually images, SSR/data fetching, fonts, or render-blocking resources.

2. **CLS (Cumulative Layout Shift)**
   - Whether the layout “jumps” while loading.
   - Target: **≤ 0.1**
   - If high: missing image sizes, late-loaded components, font swapping, banners/ads.

3. **INP / TBT (Interaction responsiveness / JS blocking)**
   - How quickly the page reacts to user input (clicks, typing).
   - If bad: too much JS on startup, large bundles, heavy components, long tasks.

4. **Opportunities (biggest time savings)**
   - Focus on the top 2–3 items with the largest “ms saved”, e.g.:
     - Reduce unused JavaScript
     - Properly size images
     - Serve images in next-gen formats
     - Eliminate render-blocking resources

5. **Total page weight & requests**
   - How many KB/MB and requests are needed for the initial view.
   - If large: LCP and INP usually suffer — optimize assets and split code.


## Main page - mobile

1. **LCP**
   - Time: **__s**
   - Element: **__**
   - How to handle:
     - x
     - y

## Animal details - mobile

## Main page - desktop

## Animal details - desktop
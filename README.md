# Pics & Prints — new homepage concept

This is a separate frontend workspace. The original website and its data remain in the parent folder and were not changed.

## Phase readiness

This site is a static preview, not a launch-ready release. Phase 0 owner approvals and hosting preflight are pending. Use [OWNER-INPUTS.md](./OWNER-INPUTS.md) to collect the details; do not invent business facts or deploy until the owner has approved the content, images, inquiry destinations, and hosting target. Phase 1 remains an inquiry-only static site; checkout, booking, uploads, analytics, and a backend are out of scope.

## Creative direction

The homepage has been refocused as a calm, cinematic editorial studio inspired by the visual storytelling and portfolio-led presentation of The Wedding Stories. It uses warm ivory, charcoal, muted antique gold, refined serif typography, and large image-led sections, paired with a charcoal and antique-gold adaptation of the Pics & Prints logo supplied by the studio. The original supplied-color logo remains available as `pics-prints-logo.png`. Photography and printing have equal prominence, with clear navigation into each side of the business. The design takes inspiration from the reference's mood and storytelling approach while using original Pics & Prints copy, structure, and presentation.

## Build order

1. **Shared homepage (current phase):** introduce Pics & Prints and provide clear entry points for Photography and Printing. This page is a frontend preview.
2. **Photography experience:** service/package pages, portfolio and gallery pages, and an inquiry/booking path.
3. **Printing experience:** product categories, product configurators, artwork/design choices, quote or checkout path.
4. **Admin-managed featured offer:** edit the offer title, copy, image, CTA, and destination URL from the admin panel. The homepage accepts a `window.PP_FEATURED_OFFER` object; the backend can supply this later. Add only a studio-provided Amazon product/affiliate URL.
5. **Backend and integration:** connect catalogue, booking, print requests, offer management, orders, and payment to persistent server data after the customer journeys and data fields are agreed.
6. **Launch preparation:** review mobile layouts, accessibility, content, image rights, hosting, security, and payment configuration.

## Preview

Open `index.html` directly for a static visual preview. Product, booking, offer administration, and payment features are not connected in this phase. Images currently use remote Unsplash URLs and need approved/licensed studio photography before launch. The optional featured-offer section stays hidden until configured with an HTTPS Amazon.in link.

## Featured offer shape

```js
window.PP_FEATURED_OFFER = {
  title: "A considered pick for your home or studio",
  description: "A short note about this week's featured find.",
  buttonLabel: "View featured find",
  url: "https://www.amazon.in/..."
};
```

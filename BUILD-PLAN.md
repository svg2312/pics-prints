# Pics & Prints Website Build Plan

## Goal and decisions

Launch `https://picsprint.in` as a polished, useful inquiry-only site first. Add customer and admin features later, in priority order, based on actual business needs.

Confirmed direction:

- Business operates in India; use INR for prices.
- First release is inquiry-only. No online checkout, deposits, or date reservations.
- Products and the homepage featured offer can be updated manually at first.
- Hosting is MilesWeb shared hosting with cPanel; the domain is `picsprint.in`.
- The current implementation is static HTML, CSS, and vanilla JavaScript. Keep that stack for launch.
- Do not overwrite or alter the separate existing website in the parent folder. Confirm the domain's document root in cPanel before uploading.

## Current Starting Point

The current homepage already includes Photography, Printing, a product collection, Stories, About, Contact, and a featured-offer section. The mobile navigation and current-year footer are handled in `app.js`. There is no backend, database, build tool, or package manager, so a static deployment is the least expensive route.

Before launch, the following are still placeholders or need owner approval:

- Business introduction, contact details, service area, and hours
- Photography services, inclusions, and pricing or quote approach
- Print products, options, materials, turnaround, and pricing or quote approach
- Studio-owned or licensed images
- The contact destinations for Photography and Printing inquiries
- Privacy information and any service/print policies that apply

Do not invent prices, business claims, delivery terms, or legal policies. If a price is not finalized, make the CTA request a quote.

## Phase 0: Owner Inputs and Hosting Preflight

Complete these before changing live files:

1. Collect the approved business name, introduction, contact details, WhatsApp number (with country code) and/or inquiry email, service area, and hours.
2. Confirm photography categories, package inclusions, session duration/location, and whether prices will be listed or quoted.
3. Confirm print categories, sizes, materials/finishes, quantity breaks, turnaround, and whether prices will be listed or quoted.
4. Approve the logo variant, fonts/colors, captions, and rights to every image.
5. Review the content and policies with the business owner. Add accurate privacy/contact information before directing customer inquiries to personal channels. Complete cancellation/refund and shipping terms before offering reservations or orders.
6. In MilesWeb cPanel, confirm DNS status, SSL options, and the document root mapped to `picsprint.in`. Do not assume it is `public_html`.
7. Back up files currently served from that document root. Confirm whether another site is using it and agree on a rollback copy.

**Exit condition:** All public-facing facts and assets are approved, contact destinations work, and the cPanel target is confirmed without risking the separate website.

## Phase 1: First Release Website

### Scope

- Keep the existing single-page site and visual direction.
- Use real approved studio content and photographs in place of demo content.
- Make Photography and Printing the primary service paths, with a direct inquiry CTA for each.
- Keep the product catalogue informative; use quote requests instead of checkout or unsupported prices.
- Keep the featured offer optional and manually updated. Disable or hide it when there is no approved offer.
- Do not add a database, custom admin, customer accounts, analytics, booking availability, cart, payment flow, file uploads, or a backend.

### Inquiry links

Use direct WhatsApp and/or email links so the first release does not need to store personal data. Replace the example phone number and wording with owner-approved details. A WhatsApp number must include country code, digits only, with no `+`, spaces, or punctuation.

```html
<a
  class="button button-outline"
  href="https://wa.me/91XXXXXXXXXX?text=Hi%20Pics%20%26%20Prints%2C%20I%27m%20interested%20in%20a%20photography%20session."
  target="_blank"
  rel="noopener noreferrer"
>
  Ask about photography <span aria-hidden="true">↗</span>
</a>

<a href="mailto:hello@picsprint.in?subject=Printing%20inquiry">
  Ask about printing
</a>
```

If email is preferred, use the actual monitored business address. Verify both links on a phone before launch. Avoid adding a form until there is a clear place to receive, protect, and manage its submissions.

### SEO and sharing metadata

The page already has a title and description. After HTTPS is working and the final public URL is confirmed, add canonical and social metadata in the `<head>` of `index.html`:

```html
<link rel="canonical" href="https://picsprint.in/">
<meta property="og:type" content="website">
<meta property="og:title" content="Pics & Prints | Photography and Printing">
<meta property="og:description" content="Photography and print services from Pics & Prints in India.">
<meta property="og:url" content="https://picsprint.in/">
<meta property="og:image" content="https://picsprint.in/images/social-share.jpg">
<meta name="twitter:card" content="summary_large_image">
```

Use a real optimized social-share image at the referenced path. Write accurate location/service copy rather than implying a service area that is not confirmed.

### Manual product content

Keep product details simple for the first release. Only show information the owner has confirmed. If the catalogue grows, it can move into a small JSON data file before a CMS is considered:

```json
[
  {
    "id": "business-cards",
    "name": "Business cards",
    "category": "Business print",
    "options": ["Size and finish confirmed with the studio"],
    "pricing": "quote",
    "inquirySubject": "Business cards inquiry"
  }
]
```

This is an example of a content shape, not finalized product data. Do not present placeholder options or prices as available offers.

### Featured offer safety

The current offer hook is `window.PP_FEATURED_OFFER` in `app.js`. Put manually edited data in a small script loaded before `app.js`, or follow the existing README contract. Example only:

```js
window.PP_FEATURED_OFFER = {
  title: "A considered find for your home or studio",
  description: "A short, owner-approved note about the featured item.",
  buttonLabel: "View the offer",
  url: "https://www.amazon.in/approved-product-url"
};
```

Before using an offer, update the current URL validation to require HTTPS and an approved host. For an Amazon-only offer, the host allowlist can look like this:

```js
const approvedHosts = new Set(["amazon.in", "www.amazon.in"]);

function getApprovedOfferUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !approvedHosts.has(url.hostname)) return "";
    return url.href;
  } catch {
    return "";
  }
}
```

Use the returned URL to enable the link; otherwise leave the offer disabled. Add a visible affiliate disclosure if the link is an affiliate link, and confirm applicable program requirements before publishing it. Do not add click tracking until its purpose and privacy handling are decided.

## Phase 2: Production Readiness and Deployment

### Pre-upload checks

- Replace all demo or unapproved imagery; compress images and use suitable dimensions.
- Add meaningful alt text to content images; use empty alt text for purely decorative images.
- Check semantic headings, navigation labels, visible keyboard focus, contrast, reduced motion, and mobile menu behavior.
- Ensure each CTA says what it does and points to the right contact destination.
- Add a favicon and a social share image.
- Create `sitemap.xml` and `robots.txt` after the final URL and public pages are settled.
- Keep analytics off unless the business chooses a tool and privacy approach.

### cPanel deployment

1. Download a fresh copy of the current hosted site or confirm the preflight backup is complete.
2. Open the domain settings in cPanel and verify the exact document root for `picsprint.in`.
3. Upload only the release files and approved image assets into that root using File Manager or FTP. Preserve unrelated files.
4. Check that the homepage filename is `index.html` and that asset paths work on the case-sensitive production filesystem, if applicable.
5. Enable the account's SSL/AutoSSL option if included. Confirm the certificate is valid before forcing HTTP to HTTPS.
6. Test both `https://picsprint.in` and the chosen `www` behavior; select one canonical version and redirect the other only after DNS/SSL are correct.
7. Test links, images, navigation, responsive layout, and inquiry paths using a phone and a private browser window.
8. Keep the pre-release copy available for rollback. Do not delete the backup until the live release has been verified.

**Hosting cost note:** The existing hosting and domain are the baseline costs. Confirm SSL, storage, bandwidth, backup, and email limits in the MilesWeb plan. Do not add paid services unless the feature needs them.

## Phase 3: Post-Launch Improvements, In Priority Order

Prioritize based on customer friction and business value, not on the length of the original feature checklist.

1. **Complete service pages and portfolio:** Separate Photography and Printing landing pages; real categories, captions, package/product details, and optimized galleries.
2. **Make inquiries easier to manage:** If direct messages are being missed, compare a hosted form or simple lead tool. Check privacy, spam protection, notification delivery, data export, and recurring cost before adopting it.
3. **Add photography booking assistance:** Start with a scheduling service and manual confirmation. Only add visible date availability when the studio can keep its calendar accurate. Add deposits after booking, cancellation, refund, and notification policies are agreed.
4. **Add print ordering:** First confirm product variants, quantity pricing, turnaround, packaging, delivery zones, shipping prices, and returns/reprint handling. Prefer a hosted commerce platform if self-service checkout is needed; validate its India payment/shipping support, fees, and data export. Do not build card handling or payment verification in frontend JavaScript.
5. **Add private galleries and artwork intake:** Choose a specialist gallery or private object storage with access controls and expiring links. Define upload types/size limits, retention, and deletion before accepting files.
6. **Add a CMS or admin:** Introduce a hosted CMS if staff need to update content frequently. Build a custom admin only if existing tools cannot support the real workflows.
7. **Add custom backend/database only when justified:** Use managed services where possible. Keep credentials server-side, validate all inputs server-side, enforce roles, store money as integer paise plus `INR`, and maintain backups and audit history.
8. **Add analytics and operational monitoring:** Choose only after defining the questions to answer, privacy requirements, and who will review the results.

## Technology by Stage

| Need | First release | Later, if justified |
| --- | --- | --- |
| Public site | Existing HTML/CSS/vanilla JS | Keep static pages unless complexity warrants a framework |
| Hosting | MilesWeb cPanel static hosting | Reassess only if backend/runtime requirements exceed the hosting plan |
| Content | Manual edits in repo | Hosted CMS for frequent nontechnical edits |
| Inquiry | WhatsApp/email links | Hosted form or lead tool after privacy/cost review |
| Booking | Manual inquiry and confirmation | Scheduling service; custom availability only if necessary |
| Print ordering | Product information and quote inquiry | Hosted ecommerce with India-compatible payments/shipping |
| Admin/database | None | Managed database/auth first; custom admin only for validated needs |
| File uploads/galleries | None | Specialist gallery or private object storage with expiring access |
| Payments | None | Hosted checkout with server-side signed webhook verification |

## Launch Acceptance Checklist

- [ ] Owner has approved business copy, services, prices or quote wording, contact details, and image rights.
- [ ] `picsprint.in` points to the intended MilesWeb account and the document root has been confirmed.
- [ ] Existing hosted content has a backup and can be restored.
- [ ] Homepage clearly routes photography and printing customers to the correct inquiry action.
- [ ] All inquiry links work on desktop and mobile and open the intended business channel.
- [ ] No demo text, unsupported claims, placeholder offer, or unapproved images remain.
- [ ] HTTPS certificate is valid, and the canonical/www behavior is consistent.
- [ ] Page title, description, social share metadata, favicon, sitemap, and robots rules are correct.
- [ ] Keyboard navigation, focus states, image alternatives, reduced motion, and mobile layouts have been checked.
- [ ] Privacy/contact information is published; transactional terms are ready before booking or checkout is later enabled.
- [ ] A short manual update and rollback procedure is documented.

## Project Files

- `index.html` — homepage, service content, inquiry actions, and metadata.
- `styles.css` — responsive layout, focus treatment, and accessible states.
- `app.js` — mobile navigation, footer year, and featured-offer behavior.
- `README.md` — local preview and manual update/deploy instructions.
- `BUILD-CHECKLIST.md` — broader feature checklist; mark items complete only after testing.

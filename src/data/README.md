# CMS-Ready Content System

This system makes all content, including alt-texts, CMS-ready through a structured JSON approach.

## How It Works

### 1. JSON Content Structure

All content is defined in `cms-content.json` with the following structure:

```json
{
  "wdcm": {
    "heading": "Page title",
    "body": "Main content text",
    "kicker": "Call-to-action text",
    "tip": "Helpful tip text",
    "images": {
      "left": { "alt": "Descriptive alt text for left image" },
      "rightTop": { "alt": "Descriptive alt text for top right image" },
      "rightBottom": { "alt": "Descriptive alt text for bottom right image" }
    }
  },
  "cards": {
    "heading": "Section title",
    "items": [
      {
        "title": "Card title",
        "body": "Card description",
        "cta": "Call-to-action text",
        "image": { "alt": "Descriptive alt text for card image" }
      }
    ]
  }
}
```

### 2. HTML Data Attributes

Images use `data-cms` attributes to reference the JSON content:

```html
<!-- Main block images -->
<img src="./images/left.jpg" alt="" data-cms="wdcm.images.left.alt" />

<!-- Card images -->
<img
  src="./images/red.jpg"
  alt=""
  data-cms="cards.items.0.image.alt"
  loading="lazy"
/>
```

### 3. JavaScript Content Injection

The JavaScript automatically injects content from the JSON:

```javascript
// Text content injection
setText('wdcm.heading', cms.wdcm.heading)

// Alt-text injection
setAttribute('wdcm.images.left.alt', 'alt', cms.wdcm.images.left.alt)
```

## CMS Integration

### For Content Managers

1. **Update JSON File**: Modify `src/data/cms-content.json` with new content
2. **Alt-Text Guidelines**: Write descriptive alt-texts that explain what's in the image
3. **Content Structure**: Follow the existing JSON structure for consistency

### For Developers

1. **Add New Images**:

   - Add image object to JSON with `alt` property
   - Add `data-cms` attribute to HTML image
   - Add injection code in JavaScript

2. **Add New Content Sections**:
   - Extend JSON structure
   - Add HTML elements with `data-cms` attributes
   - Add injection logic in JavaScript

## Benefits

- ✅ **Centralized Content**: All content in one JSON file
- ✅ **CMS-Ready**: Easy to integrate with any CMS
- ✅ **Accessibility**: Alt-texts managed through CMS
- ✅ **Maintainable**: Clear separation of content and presentation
- ✅ **Scalable**: Easy to add new content sections
- ✅ **Version Control**: Content changes tracked in Git

## Example Usage

```javascript
// Load content from CMS API
const cms = await fetch('/api/content').then((r) => r.json())

// Inject all content
setText('wdcm.heading', cms.wdcm.heading)
setAttribute('wdcm.images.left.alt', 'alt', cms.wdcm.images.left.alt)
```

This system makes your application fully CMS-ready while maintaining clean, maintainable code!

# Translation Key Structure Fix

## Problem
The application was throwing an error:
```
Error: INVALID_KEY: Namespace keys can not contain the character "." as this is used to express nesting.
Invalid keys: phone.desc (at footer), phone.tg (at footer)
```

## Root Cause
`next-intl` doesn't support flat key structures with dots (like `phone.desc`). It expects nested objects instead.

## Solution Applied

### Fixed Translation Files
Updated all three language files to use proper nested structure:

**Before (Invalid):**
```json
{
  "footer": {
    "phone.desc": "Description text",
    "phone.tg": "Telegram text"
  }
}
```

**After (Valid):**
```json
{
  "footer": {
    "phone": {
      "desc": "Description text",
      "tg": "Telegram text"
    }
  }
}
```

### Files Updated:
- `/public/locales/uz/common.json`
- `/public/locales/ru/common.json` 
- `/public/locales/en/common.json`

### Component Usage
The Footer component was already using the correct nested syntax:
```tsx
{t('footer.phone.desc')}
{t('footer.phone.tg')}
```

## Result
- ✅ Error resolved
- ✅ All translation keys now use proper nested structure
- ✅ No changes needed to component code
- ✅ All languages (uz, ru, en) updated consistently

The application should now load without the namespace key error.

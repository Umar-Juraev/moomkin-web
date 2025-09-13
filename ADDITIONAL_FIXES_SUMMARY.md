# Additional Translation Keys and Image Configuration Fix

## Problems Fixed

### 1. Missing Translation Keys
The application was throwing these errors:
```
Error: MISSING_MESSAGE: Could not resolve `30%` in messages for locale `uz`.
Error: MISSING_MESSAGE: Could not resolve `10%` in messages for locale `uz`.
```

### 2. Next.js Image Configuration Error
```
Error: Invalid src prop (https://moomkin.fsn1.your-objectstorage.com/production/uploads/eb4dfdaa-6a00-4d1c-a19f-1caad21ed814.png) on `next/image`, hostname "moomkin.fsn1.your-objectstorage.com" is not configured under images in your `next.config.js`
```

## Solutions Applied

### 1. Added Missing Percentage Translation Keys

**Updated all language files with additional discount percentage keys:**

**Uzbek (uz/common.json):**
```json
{
  "50%": "50%",
  "30%": "30%",
  "10%": "10%"
}
```

**Russian (ru/common.json):**
```json
{
  "50%": "50%",
  "30%": "30%",
  "10%": "10%"
}
```

**English (en/common.json):**
```json
{
  "50%": "50%",
  "30%": "30%",
  "10%": "10%"
}
```

### 2. Configured Next.js Image Domains

**Updated `next.config.ts` to allow images from the object storage domain:**

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'moomkin.fsn1.your-objectstorage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
```

## Usage Context

**Percentage keys (30%, 10%):**
- Used in: `src/section/Filters/Filters.tsx`
- Purpose: Filter labels for different discount percentages
- These are likely used in the discount filter carousel

**Image configuration:**
- Allows Next.js `Image` component to load images from the object storage domain
- Enables proper image optimization and loading for product images
- Uses the modern `remotePatterns` configuration (recommended over deprecated `domains`)

## Result
- ✅ Missing translation key errors resolved
- ✅ Next.js image configuration error resolved
- ✅ All languages (uz, ru, en) updated consistently
- ✅ Build successful
- ✅ Discount filters now work properly
- ✅ Product images can load from object storage
- ✅ No more MISSING_MESSAGE or image configuration errors

The application should now load without translation key errors and properly display images from the object storage domain.

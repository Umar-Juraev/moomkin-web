# QueryClient Provider Fix

## Problem
After migrating from the old i18n setup, the application was throwing this error:
```
Uncaught Error: No QueryClient set, use QueryClientProvider to set one
    at useSearchSuggestions (useDiscount.ts:90:17)
    at Header (Header.tsx:59:46)
    at MainLayout (MainLayout.tsx:14:9)
    at RootLayout (layout.tsx:79:11)
```

## Root Cause
When we removed the old `I18nProvider` component, we accidentally removed the `QueryClientProvider` that was nested inside it. The `QueryClientProvider` is required for React Query (TanStack Query) to work properly.

## Solution Applied

### Updated Layout File
Added the `QueryClientProvider` back to `/src/app/[locale]/layout.tsx`:

**Added imports:**
```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
```

**Created QueryClient instance:**
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
```

**Updated component structure:**
```typescript
<QueryClientProvider client={queryClient}>
  <NextIntlClientProvider messages={messages}>
    <MainLayout>{children}</MainLayout>
  </NextIntlClientProvider>
</QueryClientProvider>
```

## Result
- ✅ QueryClient error resolved
- ✅ React Query hooks now work properly
- ✅ Build successful
- ✅ No linting errors
- ✅ All functionality preserved

The application should now work without the QueryClient error, and all React Query hooks (like `useSearchSuggestions`) should function correctly.

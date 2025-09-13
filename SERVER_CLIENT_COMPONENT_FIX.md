# Server/Client Component Serialization Fix

## Problem
The application was throwing this error:
```
Error: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
<... client={{}} children={{...}}>
```

## Root Cause
The error occurred because we were trying to pass a `QueryClient` instance (which is a class) from a Server Component (the layout) to Client Components. In Next.js App Router, Server Components cannot pass non-serializable objects like class instances, functions, or objects with custom prototypes to Client Components.

## Solution Applied

### Created a Client-Side Provider Component
Created `/src/components/providers/QueryProvider.tsx`:

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Updated Layout File
Modified `/src/app/[locale]/layout.tsx`:

**Removed:**
- Direct import of `QueryClient` and `QueryClientProvider`
- `QueryClient` instance creation in the Server Component

**Added:**
- Import of the new `QueryProvider` component
- Wrapped components with `<QueryProvider>` instead of `<QueryClientProvider>`

**Final structure:**
```typescript
<QueryProvider>
  <NextIntlClientProvider messages={messages}>
    <MainLayout>{children}</MainLayout>
  </NextIntlClientProvider>
</QueryProvider>
```

## Key Benefits

1. **Proper Separation**: Server Components handle server-side logic, Client Components handle client-side state
2. **Serialization Compliance**: Only serializable data is passed between server and client
3. **Performance**: QueryClient is created only on the client side where it's needed
4. **Maintainability**: Clear separation of concerns between server and client logic

## Result
- ✅ Server/Client component serialization error resolved
- ✅ QueryClient functionality preserved
- ✅ Build successful
- ✅ No linting errors
- ✅ Proper Next.js App Router architecture

The application now follows Next.js App Router best practices for Server/Client Component communication.

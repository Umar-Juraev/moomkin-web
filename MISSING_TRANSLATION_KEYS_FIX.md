# Missing Translation Keys Fix

## Problem
The application was throwing these errors:
```
Error: MISSING_MESSAGE: Could not resolve `change_language` in messages for locale `uz`.
Error: MISSING_MESSAGE: Could not resolve `50%` in messages for locale `uz`.
```

## Root Cause
Two translation keys were missing from all language files:
1. `change_language` - Used in the LanguageSwitcher component
2. `50%` - Used in the Filters component

## Solution Applied

### Added Missing Keys to All Language Files

**Uzbek (uz/common.json):**
```json
{
  "change_language": "Tilni o'zgartirish",
  "50%": "50%"
}
```

**Russian (ru/common.json):**
```json
{
  "change_language": "Изменить язык", 
  "50%": "50%"
}
```

**English (en/common.json):**
```json
{
  "change_language": "Change language",
  "50%": "50%"
}
```

### Usage Context

**`change_language` key:**
- Used in: `src/components/shared/LanguageSwitcher/LanguageSwitcher.tsx`
- Purpose: Placeholder text for the language selection dropdown
- Line: `placeholder={t("change_language")}`

**`50%` key:**
- Used in: `src/section/Filters/Filters.tsx`
- Purpose: Filter label for 50% discount filter
- Line: `label: "50%"`

## Result
- ✅ Missing translation key errors resolved
- ✅ All languages (uz, ru, en) updated consistently
- ✅ Build successful
- ✅ Language switcher and filters now work properly
- ✅ No more MISSING_MESSAGE errors

The application should now load without translation key errors, and both the language switcher and discount filters should display correctly in all supported languages.

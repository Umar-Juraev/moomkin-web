export function formatDateRange(
  startDateStr: string,
  endDateStr: string,
  locale: 'ru' | 'en' | 'uz' = 'ru'
): string {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const locales: Record<'ru' | 'en', string> = {
    ru: 'ru-RU',
    en: 'en-US',
  };

  const fromToTexts: Record<'ru' | 'en', { from: string; to: string }> = {
    ru: { from: 'С', to: 'по' },
    en: { from: 'From', to: 'to' },
  };

  const uzMonthNames = [
    'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
    'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
  ];

  const getUzMonth = (date: Date) => uzMonthNames[date.getMonth()];
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  if (locale === 'uz') {
    // Uzbek format: "1 dan 6 may gacha" or "1 yanvar dan 6 fevral gacha"
    if (startMonth === endMonth) {
      return `${startDay} dan ${endDay} ${getUzMonth(endDate)} gacha`;
    } else {
      return `${startDay} ${getUzMonth(startDate)} dan ${endDay} ${getUzMonth(endDate)} gacha`;
    }
  }

  // Fallback to default logic for ru/en
  const from = fromToTexts[locale].from;
  const to = fromToTexts[locale].to;

  const dayMonthFormat: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  const formattedStart = startDate.toLocaleDateString(locales[locale], dayMonthFormat);
  const formattedEnd = endDate.toLocaleDateString(locales[locale], dayMonthFormat);

  if (startMonth === endMonth) {
    return `${from} ${startDay} ${to} ${endDay} ${startDate.toLocaleDateString(locales[locale], { month: 'long' })}`;
  } else {
    return `${from} ${formattedStart} ${to} ${formattedEnd}`;
  }
}

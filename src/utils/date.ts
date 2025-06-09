
export function formatDateRange(startDateStr: string, endDateStr: string): string {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const locale = 'ru-RU';
  const dayMonthFormat: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleDateString(locale, { month: 'long' });
  const endDay = endDate.getDate();
  const endMonth = endDate.toLocaleDateString(locale, { month: 'long' });

  if (startMonth === endMonth) {
    // Example: "С 8 по 14 мая"
    return `С ${startDay} по ${endDay} ${endMonth}`;
  } else {
    // Example: "С 25 апреля по 5 мая"
    return `С ${startDate.toLocaleDateString(locale, dayMonthFormat)} по ${endDate.toLocaleDateString(locale, dayMonthFormat)}`;
  }
}

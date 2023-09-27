export default function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  const dateTimeParts = new Intl.DateTimeFormat('pt-PT', options)
    .formatToParts(date)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {} as Record<string, string>);

  const { day, month, year, hour, minute } = dateTimeParts;
  return `${day} de ${month} de ${year} às ${hour}:${minute}`;
}

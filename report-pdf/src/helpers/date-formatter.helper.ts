export class DateFormatter {
  private static readonly formatter: Intl.DateTimeFormat =
    new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  public static getFormattedDateByDayMonthYear(date: Date): string {
    return this.formatter.format(date);
  }
}

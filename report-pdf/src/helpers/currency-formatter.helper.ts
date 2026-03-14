export class CurrencyFormatterHelper {
  private static readonly formatter: Intl.NumberFormat = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
    },
  );

  public static formatCurrency(value: number): string {
    return this.formatter.format(value);
  }
}

export function moneyFormatter(
  number: number,
  { locale, ...options }: NumberToMoneyOptions
) {
  return new Intl.NumberFormat(locale, {
    ...options,
    style: 'currency',
  }).format(number);
}

interface NumberToMoneyOptions extends Intl.NumberFormatOptions {
  locale: string;
}

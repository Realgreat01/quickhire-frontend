import { format, formatISO } from 'date-fns';
import numeral from 'numeral';

export const qhDates = {
  getOrdinalNum(n: any) {
    let s = ['th', 'st', 'nd', 'rd'],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  },

  formatDatePicker(date: string | Date) {
    const day = this.getOrdinalNum(format(date, 'd'));
    const monthYear = format(date, 'MMMM, yyyy');
    return `${day} ${monthYear}`;
  },

  formatDate(date: string | Date | null) {
    function getOrdinalNum(n: any) {
      let s = ['th', 'st', 'nd', 'rd'],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
    if (date === null || '' || undefined) return 'Present';
    const day = parseInt(format(date, 'd'), 10);
    const ordinalDay = getOrdinalNum(day);
    const month = format(date, 'MMMM');
    const year = format(date, 'yyyy');
    return `${month} ${ordinalDay}, ${year}`;
  },

  shortDate(date: string | Date | null) {
    if (date === null || '' || undefined) return 'Present';
    const value = new Date(date);
    return format(value, 'MMM dd, yyyy');
  },

  resumeDate(date: string | Date | null) {
    if (date === null || '' || undefined) return 'Present';
    const value = new Date(date);
    return format(value, 'MMMM yyyy');
  },

  getReadableDate(value: string | Date) {
    const date = new Date(value);
    const shortMonth = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${shortMonth} ${day}, ${year}`;
  },

  formatISODate(value: string | Date) {
    const date = new Date(value);
    const formattedDate = formatISO(date);
    return formattedDate;
  },
};

export const qhNumbers = {
  formatNumber(value: number | string) {
    const num = this.convertCurrencyToNumber(value);
    return `${numeral(num).format('0,0')}`;
  },

  formatIncrements(value: number | string) {
    const num = this.convertCurrencyToNumber(value);
    return `${numeral(num).format('00')}`;
  },

  formatCurrency(value: number | string) {
    const num = this.convertCurrencyToNumber(value);
    return `$${numeral(num).format('0,0.00')}`;
  },

  formatRawCurrency(value: number): string {
    return `$${value.toFixed(2)}`;
  },

  getPercentage(numerator: number, denominator: number, isString?: boolean) {
    const fraction = numerator / denominator;
    const percentage = fraction * 100;
    if (isString) {
      return `${numeral(percentage).format('0.00')}%`;
    } else return percentage;
  },

  convertCurrencyToNumber(value: string | number) {
    if (typeof value === 'number') return value;
    else if (typeof value === 'string') {
      const numberString = value.replace(/[^0-9.-]+/g, '');
      if (numberString === '') return 0;
      else return parseFloat(numberString);
    }
  },
};

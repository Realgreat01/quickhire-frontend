import { format, formatISO } from 'date-fns';
import numeral from 'numeral';

export function capitalizeWords(word: string) {
  return word.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}

export const generateUniqueHexCode = () => {
  const characters = '0123456789ABCDEF';
  let hexCode = '#';

  for (let i = 0; i < 6; i++) {
    hexCode += characters[Math.floor(Math.random() * 16)];
  }
  return hexCode;
};

export const sliceWords = (words: string, slice: number = 24) => {
  if (words.length > slice) return words.slice(0, slice) + ' ...';
  else return words.slice(0, slice);
};

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
    if (date === null || '') return 'Present';
    const day = parseInt(format(date, 'd'), 10);
    const ordinalDay = this.getOrdinalNum(day);
    const month = format(date, 'MMMM');
    const year = format(date, 'yyyy');
    return `${month} ${ordinalDay}, ${year}`;
  },

  shortDate(date: string | Date | null) {
    if (date === null || '') return 'Present';
    const month = format(date, 'MMMM');
    const year = format(date, 'yyyy');
    return `${month}, ${year}`;
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

  formatCurrency(value: number | string) {
    const num = this.convertCurrencyToNumber(value);
    return `$${numeral(num).format('0,0.00')}`;
  },

  formatRawCurrency(value: number): string {
    return `$${value.toFixed(2)}`;
  },

  convertCurrencyToNumber(value: string | number) {
    if (typeof value === 'number') return value;
    const numberString = value.replace(/[^0-9.-]+/g, '');
    if (numberString === '') return 0;
    return parseFloat(numberString);
  },
};

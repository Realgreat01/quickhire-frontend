import { format, formatISO } from 'date-fns';
import numeral from 'numeral';

export const useDate = () => {
  function getOrdinalNum(n: any) {
    let s = ['th', 'st', 'nd', 'rd'],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function formatDatePicker(date: string | Date) {
    const day = getOrdinalNum(format(date, 'd')); // '25th'
    const monthYear = format(date, 'MMMM, yyyy'); // 'April, 2024'
    return `${day} ${monthYear}`;
  }

  function formatDate(date: string | Date | null) {
    if (date === null || '') return 'Present';
    const day = parseInt(format(date, 'd'), 10);
    const ordinalDay = getOrdinalNum(day);
    const month = format(date, 'MMMM');
    const year = format(date, 'yyyy');
    return `${month} ${ordinalDay}, ${year}`;
  }

  function formatISODate(value: string | Date) {
    const date = new Date(value);
    const formattedDate = formatISO(date);
    return formattedDate;
  }

  function isValidDate(date: string | Date) {
    const parsedDate = Date.parse(date.toLocaleString());
    return !isNaN(parsedDate);
  }

  const getShortDayForm = (date: string | Date) => {
    const validDate = isValidDate(date);
    if (!validDate) return;
    const formattedDate = new Date(date);
    return formattedDate
      .toLocaleDateString('en-US', { weekday: 'short' })
      .toLowerCase();
  };

  const getLongDayForm = (date: string | Date) => {
    const validDate = isValidDate(date);
    if (!validDate) return;
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getShortMonth = (date: string | Date) => {
    const validDate = isValidDate(date);
    if (!validDate) return;
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-US', { month: 'short' });
  };

  const getReadableDate = (value: string | Date) => {
    const date = new Date(value);
    const shortMonth = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${shortMonth} ${day}, ${year}`;
  };

  const format12HourTime = (date: string | Date) => {
    const validDate = isValidDate(date);
    if (!validDate) return;

    const formattedDate = new Date(date);
    let hours = formattedDate.getHours();
    let minutes = formattedDate.getMinutes();
    let amOrPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${amOrPm}`;
  };

  const getOrdinalDate = (date: string | Date) => {
    const validDate = isValidDate(date);
    if (!validDate) return;

    const formattedDate = new Date(date);
    const day = formattedDate.getDate();

    // Handles special cases for 11th, 12th, and 13th
    if (day >= 11 && day <= 13) {
      return day + 'th';
    }

    switch (day % 10) {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd';
      default:
        return day + 'th';
    }
  };

  return {
    formatDate,
    isValidDate,
    getReadableDate,
    getLongDayForm,
    getShortMonth,
    getShortDayForm,
    format12HourTime,
    getOrdinalDate,
    formatISODate,
  };
};

export const useCurrency = () => {
  const formatNumber = (value: number | string) => {
    if (value === '') return 0;
    return `${numeral(value).format('0,0')}`;
  };

  const formatCurrency = (value: number | string) => {
    if (value === '') return 0;
    return `$${numeral(value).format('0,0.00')}`;
  };

  const formatRawCurrency = (value: number): string => {
    // if (isNaN(value)) return 0;
    return `$${value.toFixed(2)}`;
  };

  const formatCurrencyToExponential = (value: number | any): string => {
    if (value === 0 || '') {
      return `$${numeral(0).format('0')}`;
    }
    if (value % 1 != 0) {
      return `$${numeral(value).format('0.00 a')}`;
    }
    return `$${numeral(value).format('0 a')}`;
  };

  const formatNumberWithSuffix = (value: number, suffix: string) => {
    return `${numeral(value).format('0,0')} ${suffix}`;
  };

  function convertCurrencyToNumber(currencyString: string) {
     console.log({ currencyString });
    if (typeof currencyString === 'number') return currencyString;
    const numberString = currencyString.replace(/[^0-9.-]+/g, '');
    if (numberString === '') return 0;
    return parseFloat(numberString);
  }

  return {
    formatNumber,
    formatCurrency,
    formatRawCurrency,
    formatCurrencyToExponential,
    formatNumberWithSuffix,
    convertCurrencyToNumber,
  };
};

export function capitalizeWords(word: string) {
  return word.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}

export const getPercentOf = (actual = 1, total = 1) => {
  if (!actual || !total) {
    return 0;
  }
  if (actual === 0) {
    return 0;
  }
  let number = (100 * actual) / total;
  const isNotValid = isNaN(number);
  if (isNotValid) {
    return 0;
  } else {
    return number.toFixed(2);
  }
};

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

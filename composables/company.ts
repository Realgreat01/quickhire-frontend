export const companyHelpers = {
  getEmployeesCount(count: number | undefined): string {
    if (!count) return 'Less than 10';
    if (count < 10) return 'Less than 10';
    else if (count >= 10 && count < 20) return '10-20';
    else if (count >= 20 && count < 50) return '20-49';
    else if (count >= 50 && count < 100) return '50-99';
    else if (count >= 100 && count < 500) return '100-499';
    else return '500+';
  },
};

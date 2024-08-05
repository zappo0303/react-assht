// utils.js
export const formatCurrencyVND = (number: number) => {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  
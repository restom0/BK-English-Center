/**
 * utils/date.js
 * Các helper xử lý ngày tháng — dùng chung thay vì copy-paste vào từng file.
 * Thay thế 11 bản sao formatDate() rải khắp codebase.
 */

/**
 * Format date thành DD/MM/YYYY
 * @param {string|Date} date
 * @returns {string}
 */
function formatDate(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Chuyển date string/object thành YYYY-MM-DD (dùng cho input[type=date])
 * Tự động offset timezone để tránh lệch ngày.
 * @param {string|Date} dateStr
 * @returns {string}
 */
function toLocalDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
}

/**
 * Format số tiền thành định dạng "1.000.000 đ"
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  const numericAmount = Number(amount);
  if (amount == null || Number.isNaN(numericAmount)) return '0 đ';
  return `${numericAmount.toLocaleString('vi-VN')} đ`;
}

/**
 * Format số tiền dạng en-US "1,000,000 đ" (giữ tương thích codebase cũ)
 * @param {number} amount
 * @returns {string}
 */
function formatCurrencyEN(amount) {
  const numericAmount = Number(amount);
  if (amount == null || Number.isNaN(numericAmount)) return '0 đ';
  return `${numericAmount.toLocaleString('en-US')} đ`;
}

/**
 * Lấy YYYY-MM từ Date (dùng cho tháng lương, chấm công)
 * @param {Date} [date=new Date()]
 * @returns {string}
 */
function getYearMonth(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

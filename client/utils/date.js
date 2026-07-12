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
  if (isNaN(d)) return '—';
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
  if (isNaN(d)) return '';
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
}

/**
 * Format số tiền thành định dạng "1.000.000 đ"
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return '0 đ';
  return `${amount.toLocaleString('vi-VN')} đ`;
}

/**
 * Format số tiền dạng en-US "1,000,000 đ" (giữ tương thích codebase cũ)
 * @param {number} amount
 * @returns {string}
 */
function formatCurrencyEN(amount) {
  if (amount == null || isNaN(amount)) return '0 đ';
  return `${amount.toLocaleString('en-US')} đ`;
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

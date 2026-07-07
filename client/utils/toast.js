/**
 * utils/toast.js
 * Singleton Toast sử dụng SweetAlert2 — dùng chung toàn bộ client.
 * Phải load SAU sweetalert2 và TRƯỚC các page script.
 */

// Cần SweetAlert2 đã được load qua CDN trước khi file này chạy
if (typeof Swal === 'undefined') {
  console.error('[toast.js] SweetAlert2 chưa được load. Kiểm tra thứ tự script trong HTML.');
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

/**
 * Hiển thị toast thành công
 * @param {string} title
 */
function toastSuccess(title) {
  return Toast.fire({ icon: 'success', title });
}

/**
 * Hiển thị toast lỗi
 * @param {string} title
 */
function toastError(title) {
  return Toast.fire({ icon: 'error', title });
}

/**
 * Hiển thị toast cảnh báo
 * @param {string} title
 */
function toastWarning(title) {
  return Toast.fire({ icon: 'warning', title });
}

/**
 * Hiển thị toast thông tin
 * @param {string} title
 */
function toastInfo(title) {
  return Toast.fire({ icon: 'info', title });
}

/**
 * Lấy message từ jQuery XHR error response
 * @param {object} jqXHR
 * @returns {string}
 */
function getErrorMsg(jqXHR) {
  return jqXHR?.responseJSON?.msg || 'Đã xảy ra lỗi. Vui lòng thử lại.';
}

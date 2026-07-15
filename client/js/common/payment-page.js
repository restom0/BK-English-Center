let bkPaymentSettings = {};
let tableData = [];
let tempPay = [];
let tempPrize = [];
let nullPrize = [];

function bkInitPaymentPage(config) {
  bkPaymentSettings = config;
  tableData = [];
  tempPay = [];
  tempPrize = [];
  nullPrize = [];

  $.ajax({
    type: 'get',
    url: `${API_URL}/${bkPaymentSettings.peopleEndpoint}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      tableData = res.data;
    },
  });

  $(document).ready(function () {
    loadData();
  });
}

function morePay() {
  $('#morePay').click(function (e) {
    e.preventDefault();
    if ($('#morePay').text() === i18n.t('action.view_more')) {
      let payStr = '';
      tempPay.forEach((el, index) => {
        payStr += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span data-edit=${index} data-id=${el[bkPaymentSettings.personIdField]} class="studentModal">
                    ${el['name']}
                </span>
        </th>
        <td class="px-6 py-4">
        ${el['className']}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(Number(el['paid']))}
        </td>
        <td class="px-6 py-4">
        `;
        if (Number(el['paidStatus']) === 0) {
          payStr += i18n.t(bkPaymentSettings.paidStatusLabels.unpaid);
        } else {
          payStr += i18n.t(bkPaymentSettings.paidStatusLabels.paid);
        }
        payStr += `
        </td>
        <td class="px-6 py-4 flex justify-center">
            <button data-id=${el[bkPaymentSettings.personIdField]} data-tooltip-target="notification"
                class="payWarning flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" `;
        if (Number(el['paidStatus']) === 1) {
          payStr += 'disabled';
        }
        payStr += `>
                <svg class="w-6 h-6 text-gray-500 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 18 19">
                    <path
                        d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                </svg>
                <div id="notification" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.notify_salary')}
<div class="tooltip-arrow" data-popper-arrow></div>
            </button>
        <button type="button" data-tooltip-target="update"
            class="editPayBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
              index
            }">
            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 18">
                <path
                    d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path
                    d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
            </svg>
            <div id="update" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.edit')}
<div class="tooltip-arrow" data-popper-arrow></div>
        </button>
    </td >
    </tr>`;
      });
      BkSecurity.setSafeHtml($('#payData'), payStr);
      BkSecurity.setSafeHtml($('#morePay'), i18n.t('action.collapse'));
      loadStudentModal();
      addPrizeModal();
      addWarn();
      editPayModal();
      deletePay();
      editPrizeModal();
      deletePrize();
      return;
    }
    if ($('#morePay').text() === i18n.t('action.collapse')) {
      let payStr = '';
      BkSecurity.setSafeHtml($('#morePay'), i18n.t('action.view_more'));
      tempPay.forEach((el, index) => {
        if (index < 4) {
          payStr += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span data-edit=${index} data-id=${el[bkPaymentSettings.personIdField]} class="studentModal">
                    ${el['name']}
                </span>
        </th>
        <td class="px-6 py-4">
        ${el['className']}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(Number(el['paid']))}
        </td>
        <td class="px-6 py-4">
        `;
          if (Number(el['paidStatus']) === 0) {
            payStr += i18n.t(bkPaymentSettings.paidStatusLabels.unpaid);
          } else {
            payStr += i18n.t(bkPaymentSettings.paidStatusLabels.paid);
          }
          payStr += `
        </td>
        <td class="px-6 py-4 flex justify-center">
            <button data-id=${el[bkPaymentSettings.personIdField]} data-tooltip-target="notification"
                class="payWarning flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" `;
          if (Number(el['paidStatus']) === 1) {
            payStr += 'disabled';
          }
          payStr += `>
                <svg class="w-6 h-6 text-gray-500 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 18 19">
                    <path
                        d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                </svg>
                <div id="notification" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.notify_salary')}
<div class="tooltip-arrow" data-popper-arrow></div>
            </button>
        <button type="button" data-tooltip-target="update"
            class="editPayBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
              index
            }">
            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 18">
                <path
                    d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path
                    d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
            </svg>
            <div id="update" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.edit')}
<div class="tooltip-arrow" data-popper-arrow></div>
        </button>
    </td >
    </tr>`;
        }
      });
      BkSecurity.setSafeHtml($('#payData'), payStr);
      loadStudentModal();
      addPrizeModal();
      addWarn();
      editPayModal();
      deletePay();
      editPrizeModal();
      deletePrize();
      
    }
  });
}
function morePrize() {
  $('#morePrize').click(function (e) {
    if ($('#morePrize').text() === i18n.t('action.view_more')) {
      let prizeStr = '';
      tempPrize.forEach((el, index) => {
        prizeStr += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span data-edit=${index} data-id=${el[bkPaymentSettings.personIdField]} class="studentModal">
                    ${el['name']}
                </span>
        </th>
        <td class="px-6 py-4">
        ${el['className']}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(el['prize'])}
        </td>
        <td class="px-6 py-4">
        `;
        if (el['prizeStatus'] == 0) {
          prizeStr += i18n.t('status.not_received');
        } else {
          prizeStr += i18n.t('status.received');
        }
        prizeStr += `
        </td>
        <td class="px-6 py-4 flex justify-center">
            <button data-id=${el[bkPaymentSettings.personIdField]} data-tooltip-target="notification1"
                class="prizeWarning flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"`;
        if (el['prizeStatus'] == 1) {
          prizeStr += 'disabled';
        }
        prizeStr += `>
                <svg class="w-6 h-6 text-gray-500 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 18 19">
                    <path
                        d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                </svg>
                <div id="notification1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.notify_bonus')}
<div class="tooltip-arrow" data-popper-arrow></div>
            </button>
            <button type="button" data-id=${index} data-tooltip-target="update1"
            class="editPrizeBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 18">
                <path
                    d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path
                    d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
            </svg>
            <div id="update1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.edit')}
<div class="tooltip-arrow" data-popper-arrow></div>
        </button>
        <button type="button" data-tooltip-target="delete1"
            class="deletePrizeBtn flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
              index
            }">
            <svg class="w-5 h-5 text-gray-500 hover:text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
<path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
  </svg>
  <div id="delete1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.delete')}
<div class="tooltip-arrow" data-popper-arrow></div>
        </button>
        </td>
    </tr>`;
      });
      BkSecurity.setSafeHtml($('#prizeData'), prizeStr);
      BkSecurity.setSafeHtml($('#morePrize'), i18n.t('action.collapse'));
      loadStudentModal();
      addPrizeModal();
      addWarn();
      editPayModal();
      deletePay();
      editPrizeModal();
      deletePrize();
      return;
    }
    if ($('#morePrize').text() === i18n.t('action.collapse')) {
      let prizeStr = '';
      BkSecurity.setSafeHtml($('#morePrize'), i18n.t('action.view_more'));
      tempPrize.forEach((el, index) => {
        if (index < 4) {
          prizeStr += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span data-edit=${index} data-id=${el[bkPaymentSettings.personIdField]} class="studentModal">
                    ${el['name']}
                </span>
        </th>
        <td class="px-6 py-4">
        ${el['className']}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(el['prize'])}
        </td>
        <td class="px-6 py-4">
        `;
          if (el['prizeStatus'] == 0) {
            prizeStr += i18n.t('status.not_received');
          } else {
            prizeStr += i18n.t('status.received');
          }
          prizeStr += `
        </td>
        <td class="px-6 py-4 flex justify-center">
            <button data-id=${el[bkPaymentSettings.personIdField]} data-tooltip-target="notification1"
                class="prizeWarning flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"`;
          if (el['prizeStatus'] == 1) {
            prizeStr += 'disabled';
          }
          prizeStr += `>
                <svg class="w-6 h-6 text-gray-500 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 18 19">
                    <path
                        d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                </svg>
                <div id="notification1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.notify_bonus')}
<div class="tooltip-arrow" data-popper-arrow></div>
            </button>
            <button type="button" data-id=${index} data-tooltip-target="update1"
            class="editPrizeBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 18">
                <path
                    d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path
                    d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
            </svg>
            <div id="update1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.edit')}
<div class="tooltip-arrow" data-popper-arrow></div>
        </button>
        <button type="button" data-tooltip-target="delete1"
            class="deletePrizeBtn flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
              index
            }">
            <svg class="w-5 h-5 text-gray-500 hover:text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
<path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
  </svg>
  <div id="delete1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.delete')}
<div class="tooltip-arrow" data-popper-arrow></div>
        </button>
        </td>
    </tr>`;
        }
      });
      BkSecurity.setSafeHtml($('#prizeData'), prizeStr);
      loadStudentModal();
      addPrizeModal();
      addWarn();
      editPayModal();
      deletePay();
      editPrizeModal();
      deletePrize();
      
    }
  });
}
function loadData() {
  let payStr = '';
  let prizeStr = '';
  $.ajax({
    type: 'get',
    url: `${API_URL}/${bkPaymentSettings.joinClassEndpoint}/null-prize`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      nullPrize = res.data;
    },
  });
  $.ajax({
    type: 'get',
    url: `${API_URL}/${bkPaymentSettings.joinClassEndpoint}/salary`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      tempPay = res.data;
      if (res.data.length <= 4) $('#morePay').addClass('hidden');
      else {
        $('#morePay').removeClass('hidden');
      }
      (res?.data ?? []).forEach((el, index) => {
        if (index < 4) {
          payStr += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span data-edit=${index} data-id=${el[bkPaymentSettings.personIdField]} class="studentModal">
                    ${el['name']}
                </span>
        </th>
        <td class="px-6 py-4">
        ${el['className']}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(Number(el['paid']))}
        </td>
        <td class="px-6 py-4">
        `;
          if (Number(el['paidStatus']) === 0) {
            payStr += i18n.t(bkPaymentSettings.paidStatusLabels.unpaid);
          } else {
            payStr += i18n.t(bkPaymentSettings.paidStatusLabels.paid);
          }
          payStr += `
        </td>
        <td class="px-6 py-4 flex justify-center">
            <button data-id=${el[bkPaymentSettings.personIdField]} data-tooltip-target="notification"
                class="payWarning flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" `;
          if (Number(el['paidStatus']) === 1) {
            payStr += 'disabled';
          }
          payStr += `>
                <svg class="w-6 h-6 text-gray-500 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 18 19">
                    <path
                        d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                </svg>
                <div id="notification" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.notify_salary')}
<div class="tooltip-arrow" data-popper-arrow></div>
            </button>
        <button type="button" data-tooltip-target="update"
            class="editPayBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
              index
            }">
            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 18">
                <path
                    d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path
                    d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
            </svg>
            <div id="update" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.edit')}
<div class="tooltip-arrow" data-popper-arrow></div>
        </button>
    </td >
    </tr>`;
        }
      });
      BkSecurity.setSafeHtml('#payData', payStr);
      loadStudentModal();
      addPrizeModal();
      addWarn();
      editPayModal();
      deletePay();
      editPrizeModal();
      deletePrize();
    },
  });
  $.ajax({
    type: 'get',
    url: `${API_URL}/${bkPaymentSettings.joinClassEndpoint}/prize`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
    },
    dataType: 'JSON',
    success: function (res) {
      tempPrize = res.data;
      if (res.data.length <= 4) $('#morePrize').addClass('hidden');
      (res?.data ?? []).forEach((el, index) => {
        if (index < 4) {
          prizeStr += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span data-edit=${index} data-id=${el[bkPaymentSettings.personIdField]} class="studentModal">
                    ${el['name']}
                </span>
        </th>
        <td class="px-6 py-4">
        ${el['className']}
        </td>
        <td class="px-6 py-4">
        ${BkCurrency.format(el['prize'])}
        </td>
        <td class="px-6 py-4">
        `;
          if (el['prizeStatus'] == 0) {
            prizeStr += i18n.t('status.not_received');
          } else {
            prizeStr += i18n.t('status.received');
          }
          prizeStr += `
        </td>
        <td class="px-6 py-4 flex justify-center">
            <button data-id=${el[bkPaymentSettings.personIdField]} data-tooltip-target="notification1"
                class="prizeWarning flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"`;
          if (el['prizeStatus'] == 1) {
            prizeStr += 'disabled';
          }
          prizeStr += `>
                <svg class="w-6 h-6 text-gray-500 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 18 19">
                    <path
                        d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                </svg>
                <div id="notification1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.notify_bonus')}
<div class="tooltip-arrow" data-popper-arrow></div>
            </button>
            <button type="button" data-id=${index} data-tooltip-target="update1"
            class="editPrizeBtn flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 18">
                <path
                    d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path
                    d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
            </svg>
            <div id="update1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.edit')}
<div class="tooltip-arrow" data-popper-arrow></div>
        </button>
        <button type="button" data-tooltip-target="delete1"
            class="deletePrizeBtn flex items-center p-2 text-gray-500 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" data-id="${
              index
            }">
            <svg class="w-5 h-5 text-gray-500 hover:text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
<path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
  </svg>
  <div id="delete1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
${i18n.t('action.delete')}
<div class="tooltip-arrow" data-popper-arrow></div>
        </button>
        </td>
    </tr>`;
        }
      });
      BkSecurity.setSafeHtml('#prizeData', prizeStr);
      loadStudentModal();
      addPrizeModal();
      addWarn();
      editPayModal();
      editPrizeModal();
      deletePrize();
    },
  });
}
function loadStudentModal() {
  $('.studentModal').click(function (e) {
    e.preventDefault();
    let str = '';
    const id = $(this).attr('data-id');
    let char;
    tableData.forEach((el) => {
      if (Number(el.id) === Number(id)) {
        char = el;
        const dob = new Date(char.dateofbirth);
        dob.setMinutes(dob.getMinutes() - dob.getTimezoneOffset());
        char.dateofbirth = dob;
      }
    });
    str += `
    <div class="mb-5 grid grid-cols-3 gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="col-span-2" id="modal1">
    <form>
        <div>
            <div class="gap-6 mb-6">
                <label for="full_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.full_name'
                    )}</label>
                <input disabled type="text" id="full_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="${i18n.t('placeholder.person_name')}" value="${
                      char['name']
                    }" required>
            </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                  'label.dob'
                )}</label>
                <input disabled type="date" id="dob"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value=${char.dateofbirth.toISOString().split('T')[0]}     required>
            </div>
            <div>
                <label for="gender"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.gender'
                    )}</label>
                <div class="flex">`;
    if (char['sex'] === 'M') {
      str += `<div class="flex items-center mt-3 mr-4">
                    <input disabled id="inline-radio" type="radio" value="Nam" name="inline-radio-group"
                        checked class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="inline-radio"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                </div>
                <div class="flex items-center mt-3 mr-4">
                    <input disabled id="inline-2-radio" type="radio" value="Ná»¯" name="inline-radio-group"
                        class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="inline-2-radio"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${i18n.t(
                          'label.female'
                        )}</label>
                </div>`;
    } else {
      str += `<div class="flex items-center mt-3 mr-4">
                    <input disabled id="inline-radio" type="radio" value="Nam" name="inline-radio-group"
                         class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="inline-radio"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                </div>
                <div class="flex items-center mt-3 mr-4">
                    <input disabled id="inline-2-radio" type="radio" value="Ná»¯" name="inline-radio-group"
                    checked class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="inline-2-radio"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">${i18n.t(
                          'label.female'
                        )}</label>
                </div>`;
    }
    str += `
                </div>
            </div>
        </div>
        <div class="gap-6 mb-6">
            <div>
                <label for="address"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                      'label.address'
                    )}</label>
                <input disabled type="text" id="address"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="" value="${char['address']}"required>
            </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                  'label.phone'
                )}</label>
                <input disabled type="tel" id="phone"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0912345678" value="${char['phone']}"pattern="[0-9]{10}" required>
            </div>
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                  'label.email'
                )}</label>
                <input disabled type="email" id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="nguyenvana@company.com" value="${char['email']}" required>
            </div>
        </div>
    </form>
</div>
    <div>
    <div>
            <label for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                <div class="flex flex-col items-center justify-center pt-5 pb-6"style="margin-top: 12vh;" >
                    <img src="https://th.bing.com/th/id/OIP.CVdkzge14K0HJZWZg5DiMQHaHn?pid=ImgDet&rs=1" alt="">
                </div>
                <input disabled id="dropzone-file" type="file" class="hidden" />
            </label>
            <button type="submit"
                class="w-full closeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" style="margin-top:20vh">
                <span
                    class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    ${i18n.t('action.cancel')}
                </span>
            </button>
        </div></div>`;
    BkSecurity.setSafeHtml($('#studentModal'), str);
    $('#studentModal').removeClass('invisible opacity-0');
    $('#studentModal').addClass('opacity-100');
    $('#payModal').removeClass('opacity-100');
    $('#payModal').addClass('invisible opacity-0');
    $('#prizeModal').removeClass('opacity-100');
    $('#prizeModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('.payModal').removeClass('hidden');
      $('.prizeModal').removeClass('hidden');
      $('#payModal').empty();
      $('#prizeModal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#studentModal').removeClass('opacity-100');
      $('#studentModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('#studentModal').empty();
      }, 200);
    });
  });
}
function addPrizeModal() {
  $('.prizeModal').click(function (e) {
    e.preventDefault();
    $('.prizeModal').addClass('hidden');
    let str = '';
    str += `<div class="gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <form id="prizeForm">
  <div class="grid gap-6 mb-6 md:grid-cols-3">
      <div>
          <label for="namePrize"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                'label.full_name'
              )}</label>
              <select id="namePrize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>${i18n.t(bkPaymentSettings.selectPersonLabelKey)}</option>`;
    nullPrize.forEach((el) => {
      str += `<option value=${el.id}>${el.name}</option>`;
    });
    str += `

              </select>
      </div>
      <div>
          <label for="classPrize"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
                'label.class'
              )}</label>
              <select id="classPrize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>${i18n.t('select.class')}</option>`;
    nullPrize.forEach((el) => {
      str += `<option value=${el.id}>${el.className}</option>`;
    });
    str += `

              </select>
      </div>
      <div>
      <label for="prizeStatus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
        'label.status'
      )}</label>
      <select id="prizeStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option value="" selected>${i18n.t('select.status')}</option>
        <option value="0">${i18n.t('status.not_received')}</option>
        <option value="1">${i18n.t('status.received')}</option>
      </select>
      </div>
  </div>
</form>
<div style="margin-top: 4vh;">
<div class="w-full flex justify-between">
    <button type="submit"
        class="closeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span
            class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            ${i18n.t('action.cancel')}
        </span>
    </button>
    <button form="prizeForm" type="submit"
        class="submitAddPrizeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 hover:text-white">
        <span
            class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            ${i18n.t('action.change')}
        </span>
    </button>
</div></div>
</div>
</div>
  `;
    BkSecurity.setSafeHtml($('#prizeModal'), str);
    $('#prizeModal').removeClass('invisible opacity-0');
    $('#prizeModal').addClass('opacity-100');
    $('#studentModal').removeClass('opacity-100');
    $('#studentModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('#studentModal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#prizeModal').removeClass('opacity-100');
      $('#prizeModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('.prizeModal').removeClass('hidden');
        $('#prizeModal').empty();
      }, 200);
    });
    addPrize();
  });
}
function addPrize() {
  $('.submitAddPrizeBtn').click(function (e) {
    e.preventDefault();
    const fullName = $('#namePrize').val();
    const course = $('#classPrize').val();
    const status = $('#prizeStatus').val();
    if (Number(fullName) !== Number(course)) {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.no_data'),
      });
    } else if (status == '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.select_status'),
      });
    } else {
      $.ajax({
        type: 'patch',
        url: `${API_URL}/${bkPaymentSettings.joinClassEndpoint}/prize`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
        },
        data: {
          id: fullName,
          prizeStatus: status,
        },
        dataType: 'JSON',
        success: function (res) {
          Toast.fire({
            icon: 'success',
            title: i18n.t('toast.add_ok'),
          }).then(() => {
            loadData();
            $('#prizeModal').removeClass('opacity-100');
            $('#prizeModal').addClass('invisible opacity-0');
            setTimeout(function () {
              $('.prizeModal').removeClass('hidden');
              $('#prizeModal').empty();
            }, 200);
          });
        },
        error: function (jqXHR, textStatus, errorThrown) {
          Toast.fire({
            icon: 'error',
            title: jqXHR.responseJSON?.msg ?? 'Lá»—i káº¿t ná»‘i mÃ¡y chá»§',
          });
        },
      });
    }
  });
}
function addWarn() {
  $('.payWarning').click(function (e) {
    e.preventDefault();

    const id = $(this).attr('data-id');
    let char;
    tableData.forEach((el) => {
      if (Number(el.id) === Number(id)) {
        char = el;
        const dob = new Date(char.dateofbirth);
        dob.setMinutes(dob.getMinutes() - dob.getTimezoneOffset());
        char.dateofbirth = dob;
      }
    });
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.notify_salary', { name: char['name'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'get',
          url: `${API_URL}/${bkPaymentSettings.payNotificationEndpoint}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
          },
          data: {
            to: char['email'],
          },
          dataType: 'JSON',
          success: function (res) {
            Toast.fire({
              icon: 'success',
              title: i18n.t('outcome.notified_ok', { name: char['name'] }),
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            Toast.fire({
              icon: 'error',
              title: i18n.t('toast.send_fail'),
            });
          },
        });
      }
    });
  });
  $('.prizeWarning').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    let char;
    tableData.forEach((el) => {
      if (Number(el.id) === Number(id)) {
        char = el;
        const dob = new Date(char.dateofbirth);
        dob.setMinutes(dob.getMinutes() - dob.getTimezoneOffset());
        char.dateofbirth = dob;
      }
    });
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t('confirm.notify_bonus', { name: char['name'] }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'get',
          url: `${API_URL}/sendPrize`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
          },
          data: {
            to: char['email'],
          },
          dataType: 'JSON',
          success: function (res) {
            Toast.fire({
              icon: 'success',
              title: i18n.t('outcome.notified_ok', { name: char['name'] }),
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            Toast.fire({
              icon: 'error',
              title: i18n.t('toast.send_fail'),
            });
          },
        });
      }
    });
  });
}
function editPayModal() {
  $('.editPayBtn').click(function (e) {
    e.preventDefault();
    $('.payModal').addClass('hidden');
    const id = $(this).attr('data-id');
    let str = '';
    str += `<div class="gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <form id="payForm">
  <div class="grid gap-6 mb-6 md:grid-cols-3">
  <div>
      <label for="namePay"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
            'label.full_name'
          )}</label>
      <input type="text" id="namePay" disabled
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="${i18n.t('placeholder.person_name')}" value="${tempPay[id]['name']}"
          required>
  </div>
  <div>
      <label for="classPay"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
            'label.class'
          )}</label>
      <input type="text" id="classPay" disabled
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="IELTS 1" value="${tempPay[id]['className']}" required>
  </div>
  <div>
  <label for="paidStatus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
    'label.status'
  )}</label>
  <select id="paidStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    <option value="">${i18n.t('select.status')}</option>
    <option value="0"`;
    if (tempPay[id]['paidStatus'] == 0) {
      str += 'selected';
    }
    str += `>${i18n.t(bkPaymentSettings.paidStatusLabels.unpaid)}</option>
    <option value="1"`;
    if (tempPay[id]['paidStatus'] == 1) {
      str += 'selected';
    }
    str += `>${i18n.t(bkPaymentSettings.paidStatusLabels.paid)}</option>
  </select>
  </div>
  </div>
  </form>
  <div style="margin-top: 4vh;">
  <div class="w-full flex justify-between">
      <button type="submit"
          class="closeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span
              class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              ${i18n.t('action.cancel')}
          </span>
      </button>
      <button form="payForm" type="submit"
          class="submitEditPayBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 hover:text-white">
          <span
              class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              ${i18n.t('action.change')}
          </span>
      </button>
  </div></div>
  </div>
  </div>
    `;
    BkSecurity.setSafeHtml($('#payModal'), str);
    $('#payModal').removeClass('invisible opacity-0');
    $('#payModal').addClass('opacity-100');
    $('#studentModal').removeClass('opacity-100');
    $('#studentModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('#studentModal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#payModal').removeClass('opacity-100');
      $('#payModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('.payModal').removeClass('hidden');
        $('#payModal').empty();
      }, 200);
    });
    editPay(id, tempPay[id].id);
  });
}
function editPay(i, id) {
  $('.submitEditPayBtn').click(function (e) {
    e.preventDefault();
    const status = $('#paidStatus').val();
    if (!status || status === '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.select_status'),
      });
    } else {
      Swal.fire({
        title: i18n.t('confirm.title'),
        text: i18n.t(bkPaymentSettings.confirmEditKey, {
          name: tempPay[i]['name'],
          class: tempPay[i]['className'],
        }),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: i18n.t('action.confirm'),
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: 'patch',
            url: `${API_URL}/${bkPaymentSettings.joinClassEndpoint}/salary`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
            },
            data: {
              id: id,
              paidStatus: status,
            },
            dataType: 'JSON',
            success: function (res) {
              Toast.fire({
                icon: 'success',
                title: i18n.t('toast.edit_ok'),
              }).then(() => {
                $('#payModal').removeClass('opacity-100');
                $('#payModal').addClass('invisible opacity-0');
                setTimeout(function () {
                  $('.payModal').removeClass('hidden');
                  $('#payModal').empty();
                }, 200);
                loadData();
              });
            },
            error: function (jqXHR, textStatus, errorThrown) {
              Toast.fire({
                icon: 'error',
                title: jqXHR.responseJSON?.msg ?? 'Lá»—i káº¿t ná»‘i mÃ¡y chá»§',
              });
            },
          });
        }
      });
    }
  });
}
function deletePay() {
  $('.deletePayBtn').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t(bkPaymentSettings.confirmDeleteKey, {
        name: tableData[id]['name'],
        class: tableData[id]['payClass'],
      }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire({
          icon: 'success',
          title: i18n.t('toast.delete_ok'),
        }).then(() => {
          tableData[id]['payClass'] = '';
          tableData[id]['payCash'] = 0;
          tableData[id]['payStatus'] = 0;
          loadData();
        });
      }
    });
  });
}
function editPrizeModal() {
  $('.editPrizeBtn').click(function (e) {
    e.preventDefault();
    $('.prizeModal').addClass('hidden');
    const id = $(this).attr('data-id');
    let str = '';
    str += `<div class="gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<form id="prizeForm">
<div class="grid gap-6 mb-6 md:grid-cols-3">
    <div>
        <label for="namePrize"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
              'label.full_name'
            )}</label>
            <input type="text" id="namePrize" disabled
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="IELTS 1" value="${tempPrize[id]['name']}" required>
    </div>
    <div>
        <label for="classPrize"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
              'label.class'
            )}</label>
            <input type="text" id="classPrize" disabled
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="IELTS 1" value="${tempPrize[id]['className']}" required>
    </div>
    <div>
    <label for="prizeStatus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${i18n.t(
      'label.status'
    )}</label>
    <select id="prizeStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    <option value="">${i18n.t('select.status')}</option>
    <option value="0"`;
    if (tempPrize[id]['prizeStatus'] == 0) {
      str += 'selected';
    }
    str += `>${i18n.t('status.not_received')}</option>
    <option value="1"`;
    if (tempPrize[id]['prizeStatus'] == 1) {
      str += 'selected';
    }
    str += `>${i18n.t('status.received')}</option>
    </select>
    </div>
</div>
</form>
<div style="margin-top: 4vh;">
  <div class="w-full flex justify-between">
  <button type="submit"
      class="closeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
      <span
          class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          ${i18n.t('action.cancel')}
      </span>
  </button>
  <button form="prizeForm" type="submit"
      class="submitEditPrizeBtn inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 hover:text-white">
      <span
          class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          ${i18n.t('action.change')}
      </span>
  </button>
  </div></div>
</div>
</div>
`;
    BkSecurity.setSafeHtml($('#prizeModal'), str);
    $('#prizeModal').removeClass('invisible opacity-0');
    $('#prizeModal').addClass('opacity-100');
    $('#studentModal').removeClass('opacity-100');
    $('#studentModal').addClass('invisible opacity-0');
    setTimeout(function () {
      $('#studentModal').empty();
    }, 200);
    $('.closeBtn').click(function (e) {
      $('#prizeModal').removeClass('opacity-100');
      $('#prizeModal').addClass('invisible opacity-0');
      setTimeout(function () {
        $('.prizeModal').removeClass('hidden');
        $('#prizeModal').empty();
      }, 200);
    });
    editPrize(id, tempPrize[id].id);
  });
}
function editPrize(i, id) {
  $('.submitEditPrizeBtn').click(function (e) {
    e.preventDefault();
    const status = $('#prizeStatus').val();
    if (!status || status === '') {
      Toast.fire({
        icon: 'error',
        title: i18n.t('validate.select_status'),
      });
    } else {
      Swal.fire({
        title: i18n.t('confirm.title'),
        text: i18n.t(bkPaymentSettings.confirmEditKey, {
          name: tempPrize[i]['name'],
          class: tempPrize[i]['className'],
        }),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: i18n.t('action.confirm'),
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: 'patch',
            url: `${API_URL}/${bkPaymentSettings.joinClassEndpoint}/prize`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
            },
            data: {
              id: id,
              prizeStatus: status,
            },
            dataType: 'JSON',
            success: function (res) {
              Toast.fire({
                icon: 'success',
                title: i18n.t('toast.edit_ok'),
              }).then(() => {
                $('#prizeModal').removeClass('opacity-100');
                $('#prizeModal').addClass('invisible opacity-0');
                setTimeout(function () {
                  $('.prizeModal').removeClass('hidden');
                  $('#prizeModal').empty();
                }, 200);
                loadData();
              });
            },
            error: function (jqXHR, textStatus, errorThrown) {
              Toast.fire({
                icon: 'error',
                title: jqXHR.responseJSON?.msg ?? 'Lá»—i káº¿t ná»‘i mÃ¡y chá»§',
              });
            },
          });
        }
      });
    }
  });
}
function deletePrize() {
  $('.deletePrizeBtn').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('data-id');
    Swal.fire({
      title: i18n.t('confirm.title'),
      text: i18n.t(bkPaymentSettings.confirmDeleteKey, {
        name: tempPrize[id]['name'],
        class: tempPrize[id]['className'],
      }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: i18n.t('action.confirm'),
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'delete',
          url: `${API_URL}/${bkPaymentSettings.joinClassEndpoint}/prize`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('apitoken')}`,
          },
          data: {
            id: tempPrize[id].id,
          },
          dataType: 'JSON',
          success: function (res) {
            Toast.fire({
              icon: 'success',
              title: i18n.t('toast.delete_ok'),
            }).then(() => {
              loadData();
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            Toast.fire({
              icon: 'error',
              title: jqXHR.responseJSON?.msg ?? 'Lá»—i káº¿t ná»‘i mÃ¡y chá»§',
            });
          },
        });
      }
    });
  });
}

window.BkPaymentPage = {
  init: bkInitPaymentPage,
};

// DOM Elements
const accountForm = document.getElementById('account-form');
const accountIdInput = document.getElementById('account-id');
const serviceNameInput = document.getElementById('service-name');
const usernameInput = document.getElementById('username');
const secretKeyInput = document.getElementById('secret-key');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const accountsContainer = document.getElementById('accounts-container');
const themeToggle = document.getElementById('theme-toggle');
const notification = document.getElementById('notification');

// State
let accounts = [];
let editingAccountId = null;
let totpIntervals = {};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadAccounts();
  setupEventListeners();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('.icon');
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Event Listeners
function setupEventListeners() {
  themeToggle.addEventListener('click', toggleTheme);
  accountForm.addEventListener('submit', handleFormSubmit);
  cancelBtn.addEventListener('click', resetForm);
}

// Load accounts from database
async function loadAccounts() {
  try {
    accounts = await window.api.getAccounts();
    renderAccounts();
  } catch (error) {
    console.error('Error loading accounts:', error);
    showNotification('Lỗi khi tải danh sách tài khoản', 'error');
    accountsContainer.innerHTML = '<div class="empty-state"><div class="icon">❌</div><p>Không thể tải danh sách tài khoản</p></div>';
  }
}

// Render accounts list
function renderAccounts() {
  // Clear existing intervals
  Object.values(totpIntervals).forEach(interval => clearInterval(interval));
  totpIntervals = {};

  if (accounts.length === 0) {
    accountsContainer.innerHTML = `
      <div class="empty-state">
        <div class="icon">📝</div>
        <p>Chưa có tài khoản nào. Hãy thêm tài khoản đầu tiên!</p>
      </div>
    `;
    return;
  }

  accountsContainer.innerHTML = accounts.map(account => `
    <div class="account-card" data-id="${account.id}">
      <div class="account-header">
        <div class="account-info">
          <h3>${escapeHtml(account.service_name)}</h3>
          <p>${escapeHtml(account.username)}</p>
        </div>
        <div class="account-actions">
          <button class="btn btn-warning" onclick="editAccount(${account.id})">
            <span class="icon">✏️</span> Sửa
          </button>
          <button class="btn btn-danger" onclick="deleteAccount(${account.id})">
            <span class="icon">🗑️</span> Xóa
          </button>
        </div>
      </div>
      <div class="totp-section">
        <div class="totp-code">
          <div class="code-display" id="code-${account.id}">------</div>
          <button class="copy-btn" onclick="copyToClipboard('${account.id}')">
            📋 Copy
          </button>
        </div>
        <div class="timer-bar">
          <div class="timer-progress" id="timer-${account.id}"></div>
        </div>
      </div>
    </div>
  `).join('');

  // Start TOTP generation for all accounts
  accounts.forEach(account => {
    generateAndDisplayTOTP(account.id, account.secret_key);
  });
}

// Generate and display TOTP code
async function generateAndDisplayTOTP(accountId, secretKey) {
  async function updateCode() {
    try {
      const result = await window.api.generateTOTP(secretKey);
      const codeElement = document.getElementById(`code-${accountId}`);
      const timerElement = document.getElementById(`timer-${accountId}`);
      
      if (codeElement && timerElement) {
        codeElement.textContent = formatTOTPCode(result.token);
        
        // Update timer bar
        const percentage = (result.timeRemaining / 30) * 100;
        timerElement.style.width = percentage + '%';
        
        // Store the current code for copying
        codeElement.dataset.code = result.token;
      }
    } catch (error) {
      console.error('Error generating TOTP:', error);
      const codeElement = document.getElementById(`code-${accountId}`);
      if (codeElement) {
        codeElement.textContent = 'ERROR';
      }
    }
  }

  // Initial update
  await updateCode();

  // Update every second
  totpIntervals[accountId] = setInterval(updateCode, 1000);
}

// Format TOTP code (add space in middle)
function formatTOTPCode(code) {
  return code.slice(0, 3) + ' ' + code.slice(3);
}

// Copy TOTP code to clipboard
async function copyToClipboard(accountId) {
  const codeElement = document.getElementById(`code-${accountId}`);
  const code = codeElement.dataset.code || codeElement.textContent.replace(/\s/g, '');
  
  try {
    await navigator.clipboard.writeText(code);
    showNotification('Đã sao chép mã TOTP vào clipboard!', 'success');
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    showNotification('Lỗi khi sao chép mã', 'error');
  }
}

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault();

  const accountData = {
    service_name: serviceNameInput.value.trim(),
    username: usernameInput.value.trim(),
    secret_key: secretKeyInput.value.trim().toUpperCase().replace(/\s/g, '')
  };

  // Validate secret key format (Base32)
  if (!/^[A-Z2-7]+$/.test(accountData.secret_key)) {
    showNotification('Secret key không hợp lệ. Chỉ chấp nhận ký tự A-Z và 2-7', 'error');
    return;
  }

  try {
    if (editingAccountId) {
      // Update existing account
      accountData.id = editingAccountId;
      await window.api.updateAccount(accountData);
      showNotification('Cập nhật tài khoản thành công!', 'success');
    } else {
      // Add new account
      await window.api.addAccount(accountData);
      showNotification('Thêm tài khoản thành công!', 'success');
    }

    resetForm();
    await loadAccounts();
  } catch (error) {
    console.error('Error saving account:', error);
    showNotification('Lỗi khi lưu tài khoản', 'error');
  }
}

// Edit account
function editAccount(id) {
  const account = accounts.find(acc => acc.id === id);
  if (!account) return;

  editingAccountId = id;
  accountIdInput.value = id;
  serviceNameInput.value = account.service_name;
  usernameInput.value = account.username;
  secretKeyInput.value = account.secret_key;

  formTitle.textContent = 'Sửa Tài Khoản';
  submitBtn.innerHTML = '<span class="icon">💾</span> Cập Nhật';
  cancelBtn.style.display = 'inline-flex';

  // Scroll to form
  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// Delete account
async function deleteAccount(id) {
  const account = accounts.find(acc => acc.id === id);
  if (!account) return;

  const confirmed = confirm(`Bạn có chắc chắn muốn xóa tài khoản "${account.service_name}" (${account.username})?`);
  
  if (confirmed) {
    try {
      await window.api.deleteAccount(id);
      showNotification('Xóa tài khoản thành công!', 'success');
      await loadAccounts();
    } catch (error) {
      console.error('Error deleting account:', error);
      showNotification('Lỗi khi xóa tài khoản', 'error');
    }
  }
}

// Reset form
function resetForm() {
  editingAccountId = null;
  accountForm.reset();
  formTitle.textContent = 'Thêm Tài Khoản Mới';
  submitBtn.innerHTML = '<span class="icon">➕</span> Thêm Tài Khoản';
  cancelBtn.style.display = 'none';
}

// Show notification
function showNotification(message, type = 'info') {
  notification.textContent = message;
  notification.className = `notification ${type} show`;

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Make functions available globally for onclick handlers
window.editAccount = editAccount;
window.deleteAccount = deleteAccount;
window.copyToClipboard = copyToClipboard;

// DARK & LIGHT MODE
const themeBtn = document.querySelector('.container__theme-btn');

themeBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark-theme');
	themeBtn.classList.toggle('sun');

	localStorage.setItem('saved-theme', getCurrentTheme());
	localStorage.setItem('saved-icon', getCurrentIcon());
});

const getCurrentTheme = () =>
	document.body.classList.contains('dark-theme') ? 'dark' : 'light';
const getCurrentIcon = () =>
	themeBtn.classList.contains('sun') ? 'sun' : 'moon';

const savedTheme = localStorage.getItem('saved-theme');
const savedIcon = localStorage.getItem('saved-icon');

if (savedTheme) {
	document.body.classList[savedTheme === 'dark' ? 'add' : 'remove'](
		'dark-theme'
	);
	themeBtn.classList[savedIcon === 'sun' ? 'add' : 'remove']('sun');
}

// INVOICE FORM VARIABLES - INPUT ELEMENTS
const totalInvoice = document.getElementById('total-invoices');
const newInvoiceBtn = document.getElementById('newInvoice');
const senderStreet = document.getElementById('senderStreet');
const senderCity = document.getElementById('senderCity');
const senderPostal = document.getElementById('senderPostal');
const senderCountry = document.getElementById('senderCountry');
const clientName = document.getElementById('clientName');
const clientEmail = document.getElementById('clientEmail');
const clientStreet = document.getElementById('clientStreet');
const clientCity = document.getElementById('clientCity');
const clientPostal = document.getElementById('clientPostal');
const clientCountry = document.getElementById('clientCountry');
const invoiceDate = document.getElementById('invoiceDate');
const paymentTerms = document.getElementById('paymentTerms');
const projectDescription = document.getElementById('projectDescription');

const itemRow = document.querySelectorAll('.row');
const itemNames = document.querySelectorAll('.itemName');
const itemQtys = document.querySelectorAll('.itemQty');
const itemPrices = document.querySelectorAll('.itemPrice');
const itemTotals = document.querySelectorAll('.itemTotal');

const itemListForm = document.getElementById('itemListForm');

const formModal = document.getElementById('form-modal');

const invoiceSummary = document.getElementById('invoiceSummary');
const emptyIllustration = document.getElementById('emptyIllustration');

const dropdownFilter = document.querySelector('.dropdown-filter');
const filterStatus = document.getElementById('filterStatus');
const filterOptions = document.querySelector('.filter-options');
const filterOption = document.querySelector('.filter-options .option');
const filterArrow = document.querySelector('.filter-arrow');
const overlay = document.querySelector('.overlay-filter');

// INVOICE FORM VARIABLES - BUTTON ELEMENTS
const discardBtn = document.getElementById('discardBtn');
const draftBtn = document.getElementById('draftBtn');
const saveBtn = document.getElementById('saveBtn');
const addNewItemBtn = document.getElementById('addNewItem');

const paymentOptions = document.querySelector('.payment-options');
const paymentOption = document.querySelectorAll('.payment-options .option');
const dropdownArrow = document.querySelector('.dropdown-arrow');

let itemCount = 0;

draftBtn.addEventListener('click', () => {
	//show the invoice on the home page
	const invoiceEl = document.createElement('div');

	emptyIllustration.style.display = 'none';

	invoiceEl.classList.add('invoice');
	invoiceEl.innerHTML = `
		<div class="invoice__number">
			<h4><span>#</span>RT3080</h4>
		</div>
		<div class="invoice__due-date">
			<p class="body-1">Due 19 Aug 2021</p>
		</div>
		<div class="invoice__name">
			<p class="body-1">Jensen Huang</p>
		</div>
		<div class="invoice__amount">
			<h3>&pound; 1,800.90</h3>
		</div>
		<div class="invoice__status">
			<div class="status draft">
				<span class="dot"></span>
				<h4 id="status">Draft</h4>
			</div>
		</div>
		<div class="invoice__arrow">
			<img src="./assets/icon-arrow-right.svg" alt="">
		</div>	
	`;

	invoiceSummary.appendChild(invoiceEl);

	closeInvoiceForm();
});

function toggleFilterDropdown() {
	dropdownFilter.classList.toggle('active');
}

function addItemRow() {
	const rowLength = document.querySelectorAll('#itemListForm .row').length + 1;
	itemCount++;

	const itemRowEl = document.createElement('div');

	itemRowEl.classList.add('row');
	itemRowEl.innerHTML = `
		<div class="form-control">
			<input type="text" name="itemName${itemCount}" class="itemName">
		</div>
		<div class="form-control">
			<input type="text" name="itemQty${itemCount}" class="itemQty">
		</div>
		<div class="form-control">
			<input type="text" name="itemPrice${itemCount}" class="itemPrice">
		</div>
		<div class="form-control">
			<input type="text" value="${
				itemCount + 1
			}" name="itemTotal${itemCount}" class="itemTotal"
			readonly="readonly">
		</div>
		<div class="deleteBtn">
			<svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
				<path class="delete"
				d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
				fill="#888EB0" fill-rule="nonzero" />
			</svg>
		</div>
	`;

	itemListForm.appendChild(itemRowEl);
}

function deleteItemRow(e) {
	const rowLength = document.querySelectorAll('#itemListForm .row').length - 1;
	if (
		!e.target.classList.contains('delete') &&
		!e.target.classList.contains('deleteBtn')
	) {
		return;
	} else {
		console.log(rowLength);
		itemCount--;
	}

	const btn = e.target;
	btn.closest('.row').remove();
}

function clearInputFields() {
	senderStreet.value = '';
	senderCity.value = '';
	senderPostal.value = '';
	senderCountry.value = '';
	clientName.value = '';
	clientEmail.value = '';
	clientStreet.value = '';
	clientCity.value = '';
	clientPostal.value = '';
	clientCountry.value = '';
	invoiceDate.value = '';
	paymentTerms.value = '';
	projectDescription.value = '';
	itemListForm.innerHTML = '';
}

function closeTermDropdown() {
	paymentOptions.classList.add('hidden');
	dropdownArrow.classList.remove('active');
}

function openInvoiceForm() {
	formModal.classList.add('active');
	dropdownFilter.classList.remove('active');
	senderStreet.focus();
}

function closeInvoiceForm() {
	formModal.classList.remove('active');
	closeTermDropdown();
	setTimeout(clearInputFields, 1000);
}

// DROPDOWN MENU FUNCTIONALITY

function toggleTermsDropdown() {
	paymentOptions.classList.toggle('hidden');
	dropdownArrow.classList.toggle('active');
}

for (let i = 0; i < paymentOption.length; i++) {
	paymentOption[i].addEventListener('click', () => {
		toggleTermsDropdown();

		paymentTerms.value = paymentOption[i].innerText.trim();
	});
}

// EVENT LISTENERS

filterStatus.addEventListener('click', toggleFilterDropdown);
overlay.addEventListener('click', toggleFilterDropdown);

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		if (dropdownFilter.classList.contains('active')) {
			dropdownFilter.classList.remove('active');
		}

		if (!formModal.classList.contains('hidden')) {
			closeInvoiceForm();
		}
	}
});

paymentTerms.addEventListener('click', toggleTermsDropdown);

newInvoiceBtn.addEventListener('click', openInvoiceForm);
formModal.addEventListener('click', (e) => {
	if (e.target.classList.contains('form-modal')) {
		closeInvoiceForm();
	}
});

discardBtn.addEventListener('click', closeInvoiceForm);
addNewItemBtn.addEventListener('click', addItemRow);
itemListForm.addEventListener('click', deleteItemRow);

// fetch('data.json')
// 	.then((response) => response.json())
// 	.then((json) => console.log(json[0]));

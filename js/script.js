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

const itemQty = document.getElementById('itemQty');
const itemPrice = document.getElementById('itemPrice');
const itemTotal = document.getElementById('itemTotal');
const addNewItemBtn = document.getElementById('addNewItem');
const itemListForm = document.getElementById('itemListForm');

const newInvoiceBtn = document.getElementById('newInvoice');

const formModal = document.getElementById('form-modal');

const dropdownFilter = document.querySelector('.dropdown');
const filterStatus = document.getElementById('filterStatus');
const filterOptions = document.querySelector('.filter-options');
const filterOption = document.querySelector('.filter-options .option');
const filterArrow = document.querySelector('.filter-arrow');
const overlay = document.querySelector('.overlay');

function toggleFilterDropdown() {
	dropdownFilter.classList.toggle('active');
	overlay.classList.toggle('hidden');
	filterArrow.classList.toggle('active');
}

filterStatus.addEventListener('click', toggleFilterDropdown);
overlay.addEventListener('click', toggleFilterDropdown);

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		if (dropdownFilter.classList.contains('active')) {
			dropdownFilter.classList.remove('active');
		}

		if (!formModal.classList.contains('hidden')) {
			formModal.classList.add('hidden');
			paymentOptions.classList.add('hidden');
			dropdownArrow.classList.remove('active');
		}
	}
});

const paymentTerms = document.getElementById('paymentTerms');
const paymentOptions = document.querySelector('.payment-options');
const paymentOption = document.querySelectorAll('.payment-options .option');
const dropdownArrow = document.querySelector('.dropdown-arrow');

const senderStreet = document.getElementById('senderStreet');

let itemCount = 0;

function openFormModal() {
	formModal.classList.remove('hidden');
	dropdownFilter.classList.remove('active');
	senderStreet.focus();
}

function onAddRow() {
	const rowLength = document.querySelectorAll('#itemListForm .row').length + 1;
	itemCount++;

	itemListForm.innerHTML += `
		<div class="row" id="row${itemCount}">
			<div class="form-control">
				<input type="text" name="itemName${itemCount}" id="itemName${itemCount}">
			</div>
			<div class="form-control">
				<input type="text" name="itemQty${itemCount}" id="itemQty${itemCount}">
			</div>
			<div class="form-control">
				<input type="text" name="itemPrice${itemCount}" id="itemPrice${itemCount}">
			</div>
			<div class="form-control">
				<input type="text" value="row-${rowLength}" name="itemTotal${itemCount}" id="itemTotal1" class="itemTotal"
					readonly="readonly">
			</div>
			<div class="deleteBtn">
				<svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
					<path class="delete"
						d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
						fill="#888EB0" fill-rule="nonzero" />
				</svg>
			</div>
		</div>`;
}

function onDeleteRow(e) {
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

function closeFormModal(e) {
	if (e.target.classList.contains('form-modal')) {
		formModal.classList.add('hidden');

		paymentOptions.classList.add('hidden');
		dropdownArrow.classList.remove('active');
	}
}

// DROPDOWN MENU FUNCTIONALITY

function toggleDropdown() {
	paymentOptions.classList.toggle('hidden');
	dropdownArrow.classList.toggle('active');
}

for (let i = 0; i < paymentOption.length; i++) {
	paymentOption[i].addEventListener('click', () => {
		toggleDropdown();

		paymentTerms.value = paymentOption[i].innerText.trim();
	});
}

paymentTerms.addEventListener('click', toggleDropdown);

newInvoiceBtn.addEventListener('click', openFormModal);
formModal.addEventListener('click', closeFormModal);
addNewItemBtn.addEventListener('click', onAddRow);
itemListForm.addEventListener('click', onDeleteRow);

// JavaScript code goes here
// This js file is completed with much help from Professor Christopher Kearl's videos
let groceryItems = [];

function addItem() {
	let itemName = document.getElementById('item-name-input').value;
	let itemQuantity = document.getElementById('item-quantity-input').value;
	let itemCost = document.getElementById('item-cost-input').value;
	let itemCategory = document.getElementById('item-category-input').value;
	let itemCostFloat = parseFloat(itemCost);

	if (itemName) {
		groceryItems.push({
			name: itemName,
			category: itemCategory,
			quantity: itemQuantity,
			cost: itemCost,
			checked: false,
		});
	
		document.getElementById('item-name-input').value = '';
		document.getElementById('item-quantity-input').value = 0;
		document.getElementById('item-cost-input').value = '';
		document.getElementById('item-category-input').value = '';
		renderList();
	};
};

function renderList() {
	const groceryList = document.getElementById('grocery-list');
	groceryList.innerHTML = '';

	const checkAllButton = document.getElementById('check-all');

	for (const item of groceryItems) {
		let listItem = document.createElement('li');
		let checkbox = document.createElement('input'); 
		checkbox.type = 'checkbox';
		checkbox.checked = item.checked;
		checkbox.addEventListener('change', function () {
			item.checked = checkbox.checked;
			renderList();
		});
		
		let listText = document.createElement('span');
		listText.innerHTML = item.name + ', ' + item.quantity + ', ' + item.cost + ', ' + item.category; 

		let totalPrice = calculateTotal(item.quantity, item.cost);
		let priceText = document.createElement('span');
		priceText.innerHTML = " - $" + totalPrice + ' total';
		priceText.classList.add(priceStringClass(totalPrice));

		listItem.appendChild(checkbox); 
		listItem.appendChild(listText); 
		listItem.appendChild(priceText); 

		groceryList.appendChild(listItem); 
	}

	if (groceryItems.every((item) => item.checked == true)) {
		checkAllButton.innerHTML = 'Uncheck all'
	} else {
		checkAllButton.innerHTML = 'Check all'
	};

	document.getElementById("total-count").textContent = groceryItems.filter(
		(item) => !item.checked
	).length;
};

function calculateTotal(quantity, price) {
	return quantity * price;
};

function priceStringClass(totalPrice) {
	if (totalPrice >= 15) {
		return 'red-over-budget'
	} else if (totalPrice >= 10) {
		return 'orange-over-budget'
	} else if (totalPrice >= 5) {
		return 'yellow-over-budget'
	}
};

function toggleAllCheckboxes () {
	if (groceryItems.every((item) => item.checked == true)) {
		for (const item of groceryItems) {
			item.checked = false;
		};

		renderList();
		return;
	};

	for (const item of groceryItems) {
		item.checked = true;
	}; 

	renderList();
};

function clearCheckedItems() {
	groceryItems = groceryItems.filter((item) => !item.checked);
	renderList();
}

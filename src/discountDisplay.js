window.addEventListener('load', preFunc)
function preFunc() {
	const start = Date.now();
	const isLoaded = setInterval(() => {
		if (Date.now - start > 10000) clearInterval(isLoaded);
		if (document.querySelector(".product-grid") !== null) {
			clearInterval(isLoaded);
			setTimeout(main, 2000);
		}
	}, 100);
}


function main() {
	const products = document.querySelector(".product-grid");
	products.childNodes.forEach(insertDiscount);
	products.style.gridTemplateColumns = 'repeat(auto-fill,minmax(300px,1fr))';
	const catBlock = document.querySelector('.md\\:w-4\\/12.lg\\:w-3\\/12');
	catBlock.querySelectorAll('li').forEach(category => category.addEventListener('click', preFunc));
}

function insertDiscount(product, index) {

	if (product.querySelector('.eccce') !== null) { //checking if product already has the discount string
		product.querySelector('.eccce').remove();
	}
	const style = `
	font-size: 0.9rem;
	text-align: left;
	margin-top: 27px;
	font-weight: normal;
	border: 1px solid #cb2b3d;
	border-radius: 5px;
	padding: 5px;
	`;
	const discountStyle = `color: green; font-weight: bold;`;

	const insertLocation = product.querySelector('.text-lg.font-semibold.px-2');
	const cashbackString = product.firstElementChild.innerText.replace(/%\scashback/gi, '');
	const priceString = product.querySelector('.text-lg.font-semibold.px-2').innerText.replace('৳', '');
	const cashback = parseInt(cashbackString);
	const price = parseInt(priceString);
	const cashbackFull = calculateFull(price, cashback).toFixed(2);
	const toPayPartial = calculatePartial(price, cashback).toFixed(2);
	const discountedPriceFull = price > cashbackFull ? price - cashbackFull : `+ ${cashbackFull}`;
	const discountedPricePartial = price - toPayPartial;
	const htmlString = `
		<p style="${style}" class="eccce">
		ফুল পেমেন্ট এ ক্যাশব্যাক পাবেন: <span style="${discountStyle}">${cashbackFull}</span><br>
		পারশিয়াল পেমেন্ট এমাউন্ট: <span style="${discountStyle}">${toPayPartial}</span> <br>
		ফুল পেমেন্ট এ প্রোডাক্ট এর দাম: <span style="${discountStyle}">${discountedPriceFull}</span><br>
		পারশিয়াল পেমেন্ট এ প্রোডাক্ট ডিসকাউন্ট: <span style="${discountStyle}">${discountedPricePartial}</span><br>
		</p>
	`;
	insertLocation.insertAdjacentHTML('afterend', htmlString);
}

function calculateFull(price, cashback) {
	const percentage = cashback / 100;
	return price * percentage;
}

function calculatePartial(price, cashback) {
	const percentage = cashback / 100;
	return price / (percentage + 1);
}
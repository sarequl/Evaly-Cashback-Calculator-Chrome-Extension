if (window.location.href.includes('/campaign/')) {
	window.addEventListener('load', preFunc)
}
const lazyObserver = new MutationObserver(prefunc);
lazyObserver.observe(document.querySelector('.product-grid'), { childList: true, subtree: true })
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
	const products = document.querySelector('.product - grid');
	products.childNodes.forEach(insertDiscount);
	products.style.gridTemplateColumns = 'repeat(auto-fill,minmax(300px,1fr))';
	const catBlock = document.querySelector('.md\\:w-4\\/12.lg\\:w-3\\/12');
	if (catBlock !== null) {
		catBlock.querySelectorAll('li').forEach(category => category.addEventListener('click', preFunc));
	}
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
	const cashbackFull = Math.round(calculateFull(price, cashback));
	const toPayPartial = Math.round(calculatePartial(price, cashback));
	const discountedPriceFull = price > cashbackFull ? Math.round(price - cashbackFull) : `ফ্রী + ${Math.round(cashbackFull - price)}`;
	const discountedPricePartial = Math.round(price - toPayPartial);
	const htmlString = `
		<p style="${style}" class="eccce">
		ফুল পেমেন্ট এ ক্যাশব্যাক: <span style="${discountStyle}">${cashbackFull}</span><br>
		পারশিয়াল পেমেন্ট এমাউন্ট: <span style="${discountStyle}">${toPayPartial}</span> <br>
		<span style="display: block;margin-top: 10px;margin-bottom: 10px;border-bottom: 2px solid #cb2b3d;box-shadow: 1px 0px 3px 0px #00000063;"></span>
		ফুল পেমেন্ট এ প্রোডাক্ট এর দাম: <span style="${discountStyle}">${discountedPriceFull}</span><br>
		পারশিয়াল পেমেন্ট এ ডিসকাউন্ট: <span style="${discountStyle}">${discountedPricePartial}</span><br>
		<span style="font-size:0.7rem; font-style: italic; color: #cb2b3d;">সব ক্যাম্পেইন এ পারশিয়াল পেমেন্ট করা নাও যেতে পারে, অর্ডার করার আগে ইভালি'র সাথে জেনে নিন।</span>
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
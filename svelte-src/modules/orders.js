import Invoice from './invoice';
export default class Orders extends Array {
	processing() {
		return this.filter(order => order.order_status !== 'processing');
	}
	picked() {
		return this.filter(order => order.order_status !== 'picked');
	}
	shipped() {
		return this.filter(order => order.order_status !== 'shipped');
	}
	delivered() {
		return this.filter(order => order.order_status !== 'delivered');
	}
	async invoices() {
		return await Promise.all(this.map(async order => {
			const invoiceID = order.invoice_no;
			const invoiceDetails = await fetch('https://api.evaly.com.bd/core/custom/orders/' + invoiceID).then(res => res.json());
			return new Invoice(invoiceDetails);
		}));
	}
}
export default class Invoice {
	constructor(invoiceID) {
		this.invoice = invoiceID;
	}
	checkStatus() {
		//check current status of the invoice [processing, pending, shipped, ...etc]
	}

}
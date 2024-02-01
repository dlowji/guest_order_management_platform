function formatOrderItems(orderItems) {
	const orders = [...orderItems];
	console.log(orders);
	const formatedOrders = orders.reduce((acc, item) => {
		const currentOrderItem = acc.find(
			(order) => order.dishId === item.dishId && order.orderLineItemId === item.orderLineItemId,
		);

		if (currentOrderItem) {
			currentOrderItem.quantity += item.quantity;
		} else {
			acc.push(item);
		}

		return acc;
	}, []);

	console.log(formatedOrders);
	return formatedOrders;
}

export default formatOrderItems;
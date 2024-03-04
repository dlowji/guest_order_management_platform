function formatOrderItems(orderItems) {
	const orders = [...orderItems];
	const formattedOrders = orders.reduce((acc, item) => {
		console.log(item)
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
	return formattedOrders;
}

export default formatOrderItems;
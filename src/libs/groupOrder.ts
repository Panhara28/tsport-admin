import moment from 'moment';

export function groupOrder(data: any[]) {
  const items: any[] = [];

  if (data.length === 0) {
    return [];
  }

  for (const item of data) {
    const find = items.findIndex(f => f.id === item.order_id);

    if (find < 0) {
      items.push({
        id: item.order_id,
        qty: Number(item.qty),
        price: Number(item.price),
        amount: Number(item.amount),
        total: Number(item.total),
        date: moment(item.created_at).format('MMMM DD, YYYY'),
        details: [item],
      });
    } else {
      items[find].qty = items[find].qty + item.qty;
      items[find].price = items[find].price + Number(item.price);
      items[find].total = items[find].total + Number(item.total);
      items[find].amount = items[find].amount + Number(item.amount);
      items[find].details.push(item);
    }
  }

  return items;
}

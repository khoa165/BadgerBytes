import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

const generateOrderReceipt = (order) => {
  const doc = new jsPDF();
  const tableColumn = ['#', 'Item', 'Quantity', 'Unit price', 'Total price'];
  const {
    _id,
    items,
    ordered_at,
    total,
    user: { name, email, phone },
  } = order;

  const tableRows = items.map((item, i) => {
    const {
      quantity,
      id: { item_name, item_cost },
    } = item;
    return [
      i + 1,
      item_name,
      quantity,
      '$' + item_cost.toFixed(2),
      '$' + (quantity * item_cost).toFixed(2),
    ];
  });

  doc.setFont('arial', 'bold');
  doc.setFontSize(20);

  doc.text(`Order #${_id}`, 15, 20);

  doc.setFont('arial', 'normal');
  doc.setFontSize(14);

  doc.text(`Customer: ${name}`, 15, 30);
  doc.text(`Phone: ${phone}`, 15, 37);
  doc.text(`Email: ${email}`, 15, 44);

  doc.text(
    `Ordered at ${moment(ordered_at).format('HH:mm')} on ${moment(
      ordered_at
    ).format('ddd, MMM Do, YYYY')}`,
    15,
    55
  );
  doc.text(`Total: $${total.toFixed(2)}`, 15, 62);

  doc.autoTable(tableColumn, tableRows, { startY: 70 });
  doc.save(`Order_receipt_#${_id}.pdf`);
};

export default generateOrderReceipt;

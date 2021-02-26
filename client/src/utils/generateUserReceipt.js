import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

const generateUserReceipt = (user,items,paymentInfo,paymentOption) => {

  const doc = new jsPDF();
  const tableColumn = ['#', 'Item', 'Quantity', 'Unit price', 'Total price'];

  const tableRows = items.map((item, i) => {

    const {quantity,name, price }= item;


    return [
      i + 1,
      name,
      quantity,
      price.toFixed(2),
      (quantity * price).toFixed(2),
    ];
  });
  doc.setFont('arial', 'bold');
  doc.setFontSize(20);
  doc.text(`ORDER RECEIPT`, 15, 20);
  doc.setFont('arial', 'normal');
  doc.setFontSize(14);
  doc.text(`Customer: ${user.name}`, 15, 30);
  doc.text(`Phone: ${user.phone}`, 15, 37);
  doc.text(`Email: ${user.email}`, 15, 44);
  doc.text(`Ordered at ${moment().format('HH:mm')} on ${moment().format('ddd, MMM Do, YYYY')}`,15,55);

  doc.autoTable(tableColumn, tableRows, { startY: 70 });
  doc.setFont('arial', 'bold');
  doc.setFontSize(20);
  doc.text(`PICKUP DETAILS`,15,100)
  doc.setFont('arial', 'normal');
  doc.setFontSize(14);
  doc.text(`Time to pickup: ${paymentInfo.timeRange} minutes`, 15,107);
  doc.text(`Car Description: ${paymentInfo.car} `, 15,114);
  doc.text(`Additional notes: ${paymentInfo.note}`, 15,121);
  doc.text(`Payment option: ${paymentOption}`, 15,128);



  doc.save(`Order_receipt.pdf`);
};
export default generateUserReceipt;
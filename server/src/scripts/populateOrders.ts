import { airtableClient } from '../utils/airtableClient';

const mockOrders = [
  { ProductID: ['rec7gac57Vdi2JgAO'], BuyerDetails: 'John Doe - johndoe@example.com', Status: 'Pending' },
  { ProductID: ['recMm6LkvtAexLbES'], BuyerDetails: 'Jane Smith - janesmith@example.com', Status: 'Confirm' },
  { ProductID: ['recWl09CaRyLNdaQL'], BuyerDetails: 'Tom Brown - tombrown@example.com', Status: 'Shipped' },
  { ProductID: ['recyKe6sWuycjUREq'], BuyerDetails: 'Alice Johnson - alicejohnson@example.com', Status: 'Cancelled' },
];

const populateOrders = async () => {
  try {
    for (const order of mockOrders) {
      await airtableClient.post('/Orders', {
        fields: {
          ProductID: order.ProductID, // Ensure this is an array
          BuyerDetails: order.BuyerDetails,
          Status: order.Status,
        },
      });
      console.log(`Added order for product ID: ${order.ProductID[0]}`);
    }
    console.log('Mock orders added successfully!');
  } catch (error: any) {
    console.error('Error populating orders:', error.response ? error.response.data : error.message);
  }
};

populateOrders();

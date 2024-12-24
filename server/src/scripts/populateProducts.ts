import { airtableClient } from '../utils/airtableClient';

const mockProducts = [
  { Name: 'Product 1', Description: 'A great product', Price: 100, ImageURL: 'https://via.placeholder.com/150' },
  { Name: 'Product 2', Description: 'Another fantastic item', Price: 200, ImageURL: 'https://via.placeholder.com/150' },
  { Name: 'Product 3', Description: 'Must-have gadget', Price: 300, ImageURL: 'https://via.placeholder.com/150' },
  { Name: 'Product 4', Description: 'Best-selling accessory', Price: 150, ImageURL: 'https://via.placeholder.com/150' },
  { Name: 'Product 5', Description: 'Top-rated device', Price: 250, ImageURL: 'https://via.placeholder.com/150' },
];

const populateProducts = async () => {
  try {
    for (const product of mockProducts) {
      await airtableClient.post('/Products', {
        fields: product,
      });
      console.log(`Added: ${product.Name}`);
    }
    console.log('Mock data added successfully!');
  } catch (error: any) {
    console.error('Error populating Airtable:', error.response ? error.response.data : error.message);
  }
};

populateProducts();

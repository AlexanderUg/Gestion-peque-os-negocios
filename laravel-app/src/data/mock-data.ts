
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  initialStock: number;
  lowStockThreshold: number;
  createdAt: Date;
};

export type Location = {
  id: string;
  name: string;
  type: 'warehouse' | 'zone' | 'shelf';
  parentId: string | null;
};

export type Stock = {
  productId: string;
  locationId: string;
  quantity: number;
};

export type Movement = {
  id: string;
  productId: string;
  locationId: string;
  quantity: number;
  type: 'input' | 'output';
  reason: 'purchase' | 'sale' | 'adjustment' | 'transfer';
  date: Date;
  notes?: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 1299.99,
    initialStock: 50,
    lowStockThreshold: 10,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model smartphone',
    price: 899.99,
    initialStock: 100,
    lowStockThreshold: 20,
    createdAt: new Date('2023-01-20')
  },
  {
    id: '3',
    name: 'Headphones',
    description: 'Noise-cancelling headphones',
    price: 199.99,
    initialStock: 75,
    lowStockThreshold: 15,
    createdAt: new Date('2023-02-05')
  },
  {
    id: '4',
    name: 'Monitor',
    description: '27-inch 4K monitor',
    price: 349.99,
    initialStock: 40,
    lowStockThreshold: 8,
    createdAt: new Date('2023-02-10')
  },
  {
    id: '5',
    name: 'Keyboard',
    description: 'Mechanical keyboard',
    price: 129.99,
    initialStock: 60,
    lowStockThreshold: 12,
    createdAt: new Date('2023-03-01')
  }
];

export const locations: Location[] = [
  {
    id: 'w1',
    name: 'Main Warehouse',
    type: 'warehouse',
    parentId: null
  },
  {
    id: 'w2',
    name: 'Secondary Warehouse',
    type: 'warehouse',
    parentId: null
  },
  {
    id: 'z1',
    name: 'Electronics Zone',
    type: 'zone',
    parentId: 'w1'
  },
  {
    id: 'z2',
    name: 'Accessories Zone',
    type: 'zone',
    parentId: 'w1'
  },
  {
    id: 'z3',
    name: 'General Zone',
    type: 'zone',
    parentId: 'w2'
  },
  {
    id: 's1',
    name: 'Shelf A',
    type: 'shelf',
    parentId: 'z1'
  },
  {
    id: 's2',
    name: 'Shelf B',
    type: 'shelf',
    parentId: 'z1'
  },
  {
    id: 's3',
    name: 'Shelf C',
    type: 'shelf',
    parentId: 'z2'
  },
  {
    id: 's4',
    name: 'Shelf D',
    type: 'shelf',
    parentId: 'z3'
  }
];

export const stocks: Stock[] = [
  { productId: '1', locationId: 's1', quantity: 30 },
  { productId: '1', locationId: 's4', quantity: 20 },
  { productId: '2', locationId: 's1', quantity: 60 },
  { productId: '2', locationId: 's4', quantity: 40 },
  { productId: '3', locationId: 's2', quantity: 45 },
  { productId: '3', locationId: 's4', quantity: 30 },
  { productId: '4', locationId: 's2', quantity: 25 },
  { productId: '4', locationId: 's3', quantity: 15 },
  { productId: '5', locationId: 's3', quantity: 60 }
];

export const movements: Movement[] = [
  {
    id: 'm1',
    productId: '1',
    locationId: 's1',
    quantity: 30,
    type: 'input',
    reason: 'purchase',
    date: new Date('2023-03-15')
  },
  {
    id: 'm2',
    productId: '1',
    locationId: 's1',
    quantity: 5,
    type: 'output',
    reason: 'sale',
    date: new Date('2023-03-18')
  },
  {
    id: 'm3',
    productId: '2',
    locationId: 's1',
    quantity: 60,
    type: 'input',
    reason: 'purchase',
    date: new Date('2023-03-20')
  },
  {
    id: 'm4',
    productId: '3',
    locationId: 's2',
    quantity: 45,
    type: 'input',
    reason: 'purchase',
    date: new Date('2023-04-05')
  },
  {
    id: 'm5',
    productId: '2',
    locationId: 's1',
    quantity: 10,
    type: 'output',
    reason: 'sale',
    date: new Date('2023-04-10')
  }
];

// Helper function to get total stock for a product across all locations
export const getTotalStockForProduct = (productId: string): number => {
  return stocks
    .filter(stock => stock.productId === productId)
    .reduce((total, stock) => total + stock.quantity, 0);
};

// Helper function to get product details by ID
export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

// Helper function to get location details by ID
export const getLocationById = (locationId: string): Location | undefined => {
  return locations.find(location => location.id === locationId);
};

// Helper function to get location full path (e.g., Warehouse > Zone > Shelf)
export const getLocationPath = (locationId: string): string => {
  const locationParts: string[] = [];
  let currentLocation = getLocationById(locationId);
  
  while (currentLocation) {
    locationParts.unshift(currentLocation.name);
    if (currentLocation.parentId) {
      currentLocation = getLocationById(currentLocation.parentId);
    } else {
      currentLocation = undefined;
    }
  }
  
  return locationParts.join(' > ');
};

// Helper function to get all child locations of a parent location
export const getChildLocations = (parentId: string | null): Location[] => {
  return locations.filter(location => location.parentId === parentId);
};

// Helper function to check if a product is low on stock
export const isLowStock = (productId: string): boolean => {
  const product = getProductById(productId);
  if (!product) return false;
  
  const totalStock = getTotalStockForProduct(productId);
  return totalStock <= product.lowStockThreshold;
};

// Helper function to get recent movements
export const getRecentMovements = (count: number): Movement[] => {
  return [...movements]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, count);
};

// Helper function to get low stock products
export const getLowStockProducts = (): Array<{ product: Product, currentStock: number }> => {
  return products
    .map(product => ({
      product,
      currentStock: getTotalStockForProduct(product.id)
    }))
    .filter(({ product, currentStock }) => currentStock <= product.lowStockThreshold);
};

// Helper function to add a new movement and update stock
export const addMovement = (
  productId: string, 
  locationId: string, 
  quantity: number, 
  type: 'input' | 'output', 
  reason: 'purchase' | 'sale' | 'adjustment' | 'transfer',
  notes?: string
): void => {
  // Create new movement
  const newMovement: Movement = {
    id: `m${movements.length + 1}`,
    productId,
    locationId,
    quantity,
    type,
    reason,
    date: new Date(),
    notes
  };
  
  movements.push(newMovement);
  
  // Update stock
  const stockIndex = stocks.findIndex(
    stock => stock.productId === productId && stock.locationId === locationId
  );
  
  if (stockIndex >= 0) {
    // Stock exists, update quantity
    if (type === 'input') {
      stocks[stockIndex].quantity += quantity;
    } else {
      stocks[stockIndex].quantity = Math.max(0, stocks[stockIndex].quantity - quantity);
    }
  } else if (type === 'input') {
    // Stock doesn't exist and we're adding input, create new stock entry
    stocks.push({
      productId,
      locationId,
      quantity
    });
  }
};

// Helper function to get stock for a product at a specific location
export const getStockAtLocation = (productId: string, locationId: string): number => {
  const stock = stocks.find(
    stock => stock.productId === productId && stock.locationId === locationId
  );
  return stock ? stock.quantity : 0;
};

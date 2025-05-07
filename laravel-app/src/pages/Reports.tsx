
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, BarChart, PackageSearch, TrendingDown } from "lucide-react";
import {
  locations,
  products,
  stocks,
  getProductById,
  getLocationById,
  getLocationPath,
  getLowStockProducts,
} from "@/data/mock-data";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const warehouseLocations = locations.filter(
    (location) => location.type === "warehouse"
  );

  // Filter stocks based on selection
  const filteredStocks = stocks.filter((stock) => {
    if (selectedWarehouse) {
      const location = getLocationById(stock.locationId);
      if (!location) return false;

      // Check if this location belongs to the selected warehouse
      let currentLocation = location;
      while (currentLocation.parentId) {
        currentLocation = getLocationById(currentLocation.parentId) || currentLocation;
        if (!currentLocation) break;
      }

      if (currentLocation.id !== selectedWarehouse) return false;
    }

    if (selectedProduct && stock.productId !== selectedProduct) {
      return false;
    }

    return true;
  });

  // Group stocks by location for reporting
  const stocksByLocation: Record<string, Record<string, number>> = {};
  
  filteredStocks.forEach((stock) => {
    const location = getLocationById(stock.locationId);
    if (!location) return;
    
    const product = getProductById(stock.productId);
    if (!product) return;
    
    if (!stocksByLocation[location.id]) {
      stocksByLocation[location.id] = {};
    }
    
    stocksByLocation[location.id][product.id] = stock.quantity;
  });

  // Low stock products
  const lowStockProducts = getLowStockProducts();

  // Generate chart data - quantity by product
  const productChartData = products.map(product => ({
    name: product.name,
    quantity: stocks
      .filter(stock => stock.productId === product.id)
      .reduce((total, stock) => total + stock.quantity, 0)
  }));

  // Generate chart data - quantity by warehouse
  const warehouseChartData = warehouseLocations.map(warehouse => {
    // Get all locations within this warehouse
    const getChildLocationIds = (parentId: string): string[] => {
      const direct = locations
        .filter(loc => loc.parentId === parentId)
        .map(loc => loc.id);
        
      return [
        ...direct,
        ...direct.flatMap(id => getChildLocationIds(id))
      ];
    };
    
    const warehouseLocationIds = [warehouse.id, ...getChildLocationIds(warehouse.id)];
    
    // Calculate total quantity in these locations
    const quantity = stocks
      .filter(stock => warehouseLocationIds.includes(stock.locationId))
      .reduce((total, stock) => total + stock.quantity, 0);
      
    return {
      name: warehouse.name,
      quantity
    };
  });

  const handleExportReport = () => {
    // In a real app, this would generate a CSV/PDF report
    toast.success("Report exported successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            View inventory reports and analytics
          </p>
        </div>
        <Button onClick={handleExportReport}>
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Product Quantities
            </CardTitle>
            <CardDescription>
              Current stock levels by product
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={productChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#3b82f6" name="Quantity" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Warehouse Quantities
            </CardTitle>
            <CardDescription>
              Total inventory by warehouse
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={warehouseChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#10b981" name="Quantity" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stock-by-location">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="stock-by-location">Stock by Location</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock Products</TabsTrigger>
        </TabsList>
        <TabsContent value="stock-by-location">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PackageSearch className="mr-2 h-5 w-5" />
                Stock by Location
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Warehouse</label>
                  <Select
                    value={selectedWarehouse || ""}
                    onValueChange={(value) => setSelectedWarehouse(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All warehouses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All warehouses</SelectItem>
                      {warehouseLocations.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Product</label>
                  <Select
                    value={selectedProduct || ""}
                    onValueChange={(value) => setSelectedProduct(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All products</SelectItem>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.keys(stocksByLocation).map((locationId) => {
                    const location = getLocationById(locationId);
                    if (!location) return null;
                    
                    const locationProducts = Object.keys(stocksByLocation[locationId]);
                    
                    return locationProducts.map((productId, index) => {
                      const product = getProductById(productId);
                      if (!product) return null;
                      
                      const quantity = stocksByLocation[locationId][productId];
                      
                      return (
                        <TableRow key={`${locationId}-${productId}`}>
                          <TableCell>
                            {index === 0 ? getLocationPath(locationId) : ""}
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell className="text-right">{quantity}</TableCell>
                        </TableRow>
                      );
                    });
                  })}
                  {Object.keys(stocksByLocation).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No stock data available for the selected filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="low-stock">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="mr-2 h-5 w-5 text-destructive" />
                Low Stock Products
              </CardTitle>
              <CardDescription>
                Products that are below their threshold levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockProducts.map(({ product, currentStock }) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{currentStock}</TableCell>
                      <TableCell>{product.lowStockThreshold}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          currentStock === 0 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {currentStock === 0 ? 'Out of Stock' : 'Low Stock'}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {lowStockProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No low stock products found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;

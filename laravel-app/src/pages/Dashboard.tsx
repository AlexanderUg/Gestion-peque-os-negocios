
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  getTotalStockForProduct, 
  getLowStockProducts, 
  getRecentMovements, 
  products, 
  getProductById, 
  getLocationById 
} from "@/data/mock-data";
import { BarChart, TrendingDown, Package, ArrowUp, ArrowDown, Inbox } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const lowStockProducts = getLowStockProducts();
  const recentMovements = getRecentMovements(5);
  
  // Calculate total products and total inventory
  const totalProducts = products.length;
  const totalInventory = products.reduce((acc, product) => {
    return acc + getTotalStockForProduct(product.id);
  }, 0);

  // Prepare data for the chart
  const chartData = products.map(product => ({
    name: product.name,
    stock: getTotalStockForProduct(product.id),
    threshold: product.lowStockThreshold
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your inventory and stock management
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Summary cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Items in inventory
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inventory
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventory}</div>
            <p className="text-xs text-muted-foreground">
              Units in all warehouses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Products below threshold
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Movements
            </CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentMovements.length}</div>
            <p className="text-xs text-muted-foreground">
              In the last 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Chart */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Inventory Levels</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#3b82f6" name="Current Stock" />
                <Bar dataKey="threshold" fill="#ef4444" name="Low Stock Threshold" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Low stock items */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-4">
                {lowStockProducts.map(({ product, currentStock }) => (
                  <div key={product.id} className="flex items-center">
                    <div className="mr-4 rounded-full p-2 bg-red-100">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Stock: {currentStock} / Threshold: {product.lowStockThreshold}
                      </p>
                    </div>
                    <div className={`text-sm font-medium ${
                      currentStock <= product.lowStockThreshold / 2 
                        ? 'text-red-600' 
                        : 'text-amber-600'
                    }`}>
                      {currentStock} units
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">All stock levels are healthy</p>
            )}
          </CardContent>
        </Card>

        {/* Recent movements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Movements</CardTitle>
          </CardHeader>
          <CardContent>
            {recentMovements.length > 0 ? (
              <div className="space-y-4">
                {recentMovements.map(movement => {
                  const product = getProductById(movement.productId);
                  const location = getLocationById(movement.locationId);
                  return (
                    <div key={movement.id} className="flex items-center">
                      <div className={`mr-4 rounded-full p-2 ${
                        movement.type === 'input' 
                          ? 'bg-green-100' 
                          : 'bg-amber-100'
                      }`}>
                        {movement.type === 'input' ? (
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {product?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {location?.name} • {new Date(movement.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`text-sm font-medium ${
                        movement.type === 'input' 
                          ? 'text-green-600' 
                          : 'text-amber-600'
                      }`}>
                        {movement.type === 'input' ? '+' : '-'}{movement.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent movements</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

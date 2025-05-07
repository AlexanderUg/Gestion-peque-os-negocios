
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, ArrowDown, Plus, Calendar } from "lucide-react";
import {
  products,
  locations,
  movements,
  getProductById,
  getLocationById,
  getLocationPath,
  addMovement,
} from "@/data/mock-data";
import { toast } from "sonner";

const StockMovements = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMovement, setNewMovement] = useState({
    productId: "",
    locationId: "",
    quantity: 1,
    type: "input" as "input" | "output",
    reason: "purchase" as "purchase" | "sale" | "adjustment" | "transfer",
    notes: ""
  });

  const handleAddMovement = () => {
    // Validate form
    if (!newMovement.productId || !newMovement.locationId || newMovement.quantity <= 0) {
      toast.error("Please fill all required fields with valid values");
      return;
    }

    // In a real app, you would send this to an API
    addMovement(
      newMovement.productId,
      newMovement.locationId,
      newMovement.quantity,
      newMovement.type,
      newMovement.reason,
      newMovement.notes
    );
    
    toast.success(`Stock ${newMovement.type === 'input' ? 'added to' : 'removed from'} inventory`);
    setShowAddDialog(false);
    
    // Reset form
    setNewMovement({
      productId: "",
      locationId: "",
      quantity: 1,
      type: "input",
      reason: "purchase",
      notes: ""
    });
  };

  // Sort movements by date (newest first)
  const sortedMovements = [...movements].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Movements</h1>
          <p className="text-muted-foreground">
            Manage inputs and outputs of inventory
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Movement
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Movement History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMovements.map((movement) => {
                const product = getProductById(movement.productId);
                const location = getLocationById(movement.locationId);
                
                return (
                  <TableRow key={movement.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {new Date(movement.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product?.name}</TableCell>
                    <TableCell>{getLocationPath(movement.locationId)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {movement.type === "input" ? (
                          <>
                            <div className="mr-2 rounded-full p-1 bg-green-100">
                              <ArrowUp className="h-3 w-3 text-green-600" />
                            </div>
                            Input
                          </>
                        ) : (
                          <>
                            <div className="mr-2 rounded-full p-1 bg-amber-100">
                              <ArrowDown className="h-3 w-3 text-amber-600" />
                            </div>
                            Output
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{movement.quantity}</TableCell>
                    <TableCell>
                      <span className="capitalize">{movement.reason}</span>
                    </TableCell>
                  </TableRow>
                );
              })}
              {movements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No movements recorded
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Movement Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Stock Movement</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="movementType" className="text-right">
                Type
              </Label>
              <Select
                value={newMovement.type}
                onValueChange={(value: "input" | "output") => 
                  setNewMovement({
                    ...newMovement, 
                    type: value,
                    reason: value === 'input' ? 'purchase' : 'sale'
                  })
                }
              >
                <SelectTrigger id="movementType" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="input">Input</SelectItem>
                  <SelectItem value="output">Output</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">
                Product
              </Label>
              <Select
                value={newMovement.productId}
                onValueChange={(value) => setNewMovement({...newMovement, productId: value})}
              >
                <SelectTrigger id="product" className="col-span-3">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Select
                value={newMovement.locationId}
                onValueChange={(value) => setNewMovement({...newMovement, locationId: value})}
              >
                <SelectTrigger id="location" className="col-span-3">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations
                    .filter(location => location.type === 'shelf')
                    .map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {getLocationPath(location.id)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newMovement.quantity}
                onChange={(e) => setNewMovement({...newMovement, quantity: parseInt(e.target.value) || 0})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Select
                value={newMovement.reason}
                onValueChange={(value: "purchase" | "sale" | "adjustment" | "transfer") => 
                  setNewMovement({...newMovement, reason: value})
                }
              >
                <SelectTrigger id="reason" className="col-span-3">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {newMovement.type === 'input' ? (
                    <>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="adjustment">Adjustment</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="adjustment">Adjustment</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={newMovement.notes}
                onChange={(e) => setNewMovement({...newMovement, notes: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMovement}>
              {newMovement.type === 'input' ? 'Add Stock' : 'Remove Stock'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StockMovements;

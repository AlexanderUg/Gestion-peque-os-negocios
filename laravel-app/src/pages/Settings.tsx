
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const [companyName, setCompanyName] = useState("My Company");
  const [lowStockNotifications, setLowStockNotifications] = useState(true);
  const [automaticReports, setAutomaticReports] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Configure your company information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveGeneral}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low Stock Notifications</p>
              <p className="text-sm text-muted-foreground">
                Get notifications when products are running low
              </p>
            </div>
            <Switch
              checked={lowStockNotifications}
              onCheckedChange={setLowStockNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Automatic Reports</p>
              <p className="text-sm text-muted-foreground">
                Generate weekly inventory reports automatically
              </p>
            </div>
            <Switch
              checked={automaticReports}
              onCheckedChange={setAutomaticReports}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveNotifications}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Manage your inventory data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">Export All Data</p>
            <p className="text-sm text-muted-foreground mb-2">
              Download a complete backup of your inventory data
            </p>
            <Button variant="outline" onClick={() => toast.success("Data export started")}>
              Export Data
            </Button>
          </div>
          <Separator />
          <div>
            <p className="font-medium">Clear All Data</p>
            <p className="text-sm text-muted-foreground mb-2">
              Remove all inventory data from the system
            </p>
            <Button variant="destructive" onClick={() => toast.error("This would delete all data in a real app")}>
              Clear Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

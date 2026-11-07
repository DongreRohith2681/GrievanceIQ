import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>CivicFix</CardTitle>
          <CardDescription>
            Smart Public Grievance Management System
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="mb-4 text-sm text-gray-600">
            Welcome to CivicFix. Report problems and help improve your city.
          </p>

          <Button className="w-full">
            Report an Issue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
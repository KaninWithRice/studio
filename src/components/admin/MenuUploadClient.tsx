
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNoodleContext } from '@/hooks/useNoodleContext';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { mockMenuItems as newMockMenu } from '@/lib/mockData'; // Import mock data to simulate update

export default function MenuUploadClient() {
  const { setMenuItems } = useNoodleContext();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || selectedFile.name.endsWith('.xlsx')) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an .xlsx Excel file.",
          variant: "destructive",
        });
        setFile(null);
        event.target.value = ""; // Reset file input
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select an Excel file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call and GenAI processing
    // In a real app, you would send `file` to a server action or API endpoint
    // that uses the GenAI flow from `src/ai/flows` to parse the Excel.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

    // For this demo, we'll just update the context with new mock data
    // to simulate a successful import.
    // You could modify newMockMenu to be slightly different from the initial mockMenuItems
    // to see a change.
    const updatedMenuItems = newMockMenu.map(item => ({ ...item, name: `${item.name} (Updated)` }));
    setMenuItems(updatedMenuItems); 
    
    setIsLoading(false);
    setFile(null);
    // To clear the file input visually, target might need to be reset if not part of a form reset
    const form = event.target as HTMLFormElement;
    form.reset();


    toast({
      title: "Menu Updated Successfully!",
      description: `Simulated import of ${file.name}. The menu has been refreshed.`,
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <FileSpreadsheet className="h-6 w-6 text-primary" />
          Import Menu from Excel
        </CardTitle>
        <CardDescription>
          Upload an .xlsx file to update the restaurant menu. This will replace the current menu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="menu-file" className="text-foreground">Excel File (.xlsx)</Label>
            <Input
              id="menu-file"
              type="file"
              accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
              className="bg-card file:text-primary file:font-semibold file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary/10 hover:file:bg-primary/20"
              disabled={isLoading}
            />
            {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={!file || isLoading}>
            {isLoading ? (
              <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-5 w-5" />
            )}
            {isLoading ? 'Processing...' : 'Upload and Update Menu'}
          </Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          Note: This is a simulation. Actual Excel parsing would involve a backend process potentially using GenAI.
        </p>
      </CardContent>
    </Card>
  );
}

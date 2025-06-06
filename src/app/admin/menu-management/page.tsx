
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Sheet as SheetIcon } from 'lucide-react'; // Changed FileSpreadsheet to SheetIcon
import Link from 'next/link';

export default function MenuManagementPage() {
  const googleSheetUrl = "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit"; // Replace with actual link

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-headline font-bold text-center mb-12 text-primary">
        Menu Management (via Google Sheets)
      </h1>
      <Card className="w-full max-w-lg mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <SheetIcon className="h-6 w-6 text-primary" />
            Google Sheets Menu Source
          </CardTitle>
          <CardDescription>
            Your restaurant's menu is managed through a centralized Google Sheet.
            Please update the sheet to reflect any changes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground">
            To update the menu, please edit the designated Google Sheet. Ensure your sheet
            has columns such as: <code className="bg-muted px-1 py-0.5 rounded">Name</code>,
            <code className="bg-muted px-1 py-0.5 rounded">Description</code>,
            <code className="bg-muted px-1 py-0.5 rounded">Price</code>,
            <code className="bg-muted px-1 py-0.5 rounded">Category</code>,
            and optionally <code className="bg-muted px-1 py-0.5 rounded">ImageUrl</code>.
          </p>
          
          <Button asChild className="w-full">
            <Link href={googleSheetUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              Open Menu Google Sheet
            </Link>
          </Button>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            <strong>Note:</strong> For automatic updates from this sheet to the app,
            Google Sheets API integration and a backend process (e.g., using Genkit)
            would need to be implemented. Currently, menu data is loaded from mock data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

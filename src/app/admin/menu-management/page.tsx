import MenuUploadClient from '@/components/admin/MenuUploadClient';

export default function MenuManagementPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-headline font-bold text-center mb-12 text-primary">
        Menu Management
      </h1>
      <MenuUploadClient />
    </div>
  );
}

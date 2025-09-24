import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Produk Hukum',
        href: '/produk-hukum/edit',
    },
];

interface ProdukHukum {
    id:number,
    judul:string,
    deskripsi:string,
    file:string,
    created_at:string,
}

interface Props {
    produkHukum : ProdukHukum;
}

export default function Edit({produkHukum} : Props) {
    const {data, setData, put, errors} = useForm({
        judul: produkHukum.judul, 
        deskripsi: produkHukum.deskripsi, 
        file: produkHukum.file 
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('produk-hukum.update', produkHukum.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Produk Hukum" />
            <div className="w-1/2 p-4">
                <form onSubmit={handleUpdate} className='space-y-4'>
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className='h-4 w-4'/>
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div>
                        <Label htmlFor='judul'>Judul</Label>
                        <Input placeholder='Masukkan Judul' value={data.judul} onChange={(e) => setData('judul', e.target.value)}></Input>
                    </div>
                    <div>
                        <Label htmlFor='deskrispsi'>Deskripsi</Label>
                        <Textarea placeholder='Deskripsi' value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)}></Textarea>
                    </div>
                    <div>
                        <Label htmlFor='file'>File</Label>
                        <Input type='file' onChange={(e) => setData('file', e.target.value)}></Input>
                    </div>
                    <Button type='submit'>Edit</Button>
                </form>
            </div>
        </AppLayout>
    );
}

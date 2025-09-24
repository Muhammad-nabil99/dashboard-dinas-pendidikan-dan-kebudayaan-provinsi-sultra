import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarDays, Megaphone, Scale } from 'lucide-react';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk Hukum',
        href: '/produk-hukum',
    },
];

interface ProdukHukum {
    id:number,
    judul:string,
    deskripsi:string,
    file:string,
    created_at:string,
}

interface PageProps{
    flash: {
        message?: string;
    },
    produk_hukum: ProdukHukum[]
}

export default function Index() {

    const { produk_hukum,flash } = usePage().props as PageProps;

    
    const {processing, delete:destroy } = useForm();

    const handleDelete = (id:number, judul:string) => {
        if(confirm(`Apakah anda yakin ingin menghapus - ${id} . ${judul}`)) {
            destroy(`/produk-hukum/${id}`);
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk Hukum" />
            <div className="m-4">
                <Link href={route('produk-hukum.create')}>
                    <Button>Tambah</Button>
                </Link>
            </div>
            <div className="w-1/2 px-4">
                {flash.message && (
                    <Alert>
                        <Megaphone className='h-4 w-4'/>
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            {produk_hukum.length > 0 && (
                <div className="m-4 space-y-4">
                    {produk_hukum.map((produk_hukum) => (
                    <div
                        key={produk_hukum.id}
                        className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                        <div className="space-y-2">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Scale/>
                            {produk_hukum.judul}
                        </h2>
                            <p className="text-gray-600">{produk_hukum.deskripsi}</p>
                        <p className="text-gray-500 text-sm flex items-center gap-2">
                            <CalendarDays/>
                            {new Date(produk_hukum.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>

                        </div>

                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <Button className='bg-blue-900 hover:bg-blue-800'>Lihat Detail</Button>
                            <Button disabled={processing} onClick={()=> handleDelete(produk_hukum.id, produk_hukum.judul)} className='bg-red-600 hover:bg-red-500'>Hapus</Button>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}

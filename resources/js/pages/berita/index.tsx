import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CalendarDays, Megaphone, Scale } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Berita',
        href: '/berita',
    },
];

interface Berita {
    id:number,
    judul:string,
    deskripsi:string,
    cover_image:string,
    file:string,
    category:string,
    instansi:string,
    lokasi:string,
    created_at:string,
}


interface CustomPageProps {
    flash: {
        message?: string;
    };
    berita: Berita[];
}

type PageProps = InertiaPageProps & CustomPageProps;

export default function Index() {

    const { berita, flash } = usePage<PageProps>().props;

    // const { processing, delete: destroy } = useForm();

    // const handleDelete = (id: number, judul: string) => {
    //     if (confirm(`Apakah anda yakin ingin menghapus - ${id}. ${judul}`)) {
    //     destroy(`/berita/${id}`);
    //     }
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Berita" />

            {/* Tombol Tambah */}
            <div className="m-4">
                <Link href={route("berita.create")}>
                    <Button>Tambah</Button>
                </Link>
            </div>

            {/* Flash Message */}
            <div className="w-full md:w-1/2 px-4">
                {flash.message && (
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>

            {/* Daftar Produk Hukum */}
            {berita.length > 0 && (
                <div className="m-4 space-y-4">
                    {berita.map((beritas) => (
                        <div
                            key={beritas.id}
                            className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                        >
                            {/* Info Produk */}
                            <div className="space-y-2 flex-1">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Scale />
                                    {beritas.judul}
                                </h2>
                                <p className="text-gray-600">{beritas.deskripsi}</p>
                                <p className="text-gray-500 text-sm flex items-center gap-2">
                                    <CalendarDays />
                                    {new Date(beritas.created_at).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            {/* Aksi */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                {/* <Link href={route("berita.edit", beritas.id)}>
                                    <Button className="bg-blue-900 hover:bg-blue-800 w-full sm:w-auto">
                                        Ubah
                                    </Button>
                                </Link> */}
                                {/* <Button
                                    disabled={processing}
                                    onClick={() => handleDelete(beritas.id, beritas.judul)}
                                    className="bg-red-600 hover:bg-red-500 w-full sm:w-auto"
                                >
                                    Hapus
                                </Button> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}

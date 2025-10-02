import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { CalendarDays, FileText, ListFilterPlus, Megaphone } from 'lucide-react';
import { useMemo, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Kegiatan',
        href: '/laporan-kegiatan',
    },
];

interface LaporanKegiatan {
    id: number;
    judul: string;
    deskripsi: string;
    lokasi: string;
    penyelenggara: string;
    file: string;
    created_at: string;
    updated_at: string;
    // bidang_id: string;
    // admin_id: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    laporan_kegiatan: LaporanKegiatan[];
}

export default function Index() {
    const [sortOrder, setSortOrder] = useState<'terbaru' | 'terlama'>('terbaru');
    const { laporan_kegiatan, flash } = usePage().props as unknown as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, judul: string) => {
        if (confirm(`Apakah anda yakin ingin menghapus - ${id} . ${judul}`)) {
            destroy(`/laporan-kegiatan/${id}`);
        }
    };
    const handleEdit = (id: number) => {
        router.visit(route('laporan-kegiatan.edit', id));
    };

    const sortedDocuments = useMemo(() => {
        const sort = laporan_kegiatan.sort((a, b) => {
            const dataA = new Date(a.created_at).getTime();
            const dataB = new Date(b.created_at).getTime();

            return sortOrder === 'terbaru' ? dataB - dataA : dataA - dataB;
        });

        return sort;
    }, [laporan_kegiatan, sortOrder]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Kegiatan" />
            <div className="m-4 flex items-center justify-between capitalize">
                <h1 className="text-2xl font-semibold">laporan kegiatan</h1>
                <div className="flex items-center">
                    <Link href={route('laporan-kegiatan.create')}>
                        <Button>Tambah</Button>
                    </Link>
                    <div className="m-4">
                        <DropdownMenu>
                            {/* The asChild prop ensures the Button component is the trigger, not a wrapping div */}
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <ListFilterPlus /> filter
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup className="capitalize">
                                    <DropdownMenuItem onClick={() => setSortOrder('terbaru')}>terbaru</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOrder('terlama')}>terlama</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <div className="w-1/2 px-4">
                {flash.message && (
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>
            {laporan_kegiatan.length > 0 ? (
                <div className="m-4 space-y-4">
                    {sortedDocuments?.map((laporan_kegiatan) => (
                        <div
                            key={laporan_kegiatan.id}
                            className="flex flex-col rounded-2xl bg-white p-6 shadow md:flex-row md:items-center md:justify-between"
                        >
                            <div className="space-y-2">
                                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                    <FileText />
                                    {laporan_kegiatan.judul}
                                </h2>
                                <p className="text-gray-600">{laporan_kegiatan.deskripsi}</p>
                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <CalendarDays />
                                    {new Date(laporan_kegiatan.updated_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    }) +
                                        ' ' +
                                        new Date(laporan_kegiatan.updated_at).toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        }) ||
                                        new Date(laporan_kegiatan.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        }) +
                                            ' ' +
                                            new Date(laporan_kegiatan.created_at).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                            })}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center gap-3 md:mt-0">
                                <Button onClick={() => handleEdit(laporan_kegiatan.id)} className="bg-blue-900 hover:bg-blue-800">
                                    ubah
                                </Button>
                                <Button
                                    disabled={processing}
                                    onClick={() => handleDelete(laporan_kegiatan.id, laporan_kegiatan.judul)}
                                    className="bg-red-600 hover:bg-red-500"
                                >
                                    Hapus
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-10 text-center text-gray-500">
                    <p className="mb-4 capitalize">Belum ada laporan kegiatan</p>
                </div>
            )}
        </AppLayout>
    );
}

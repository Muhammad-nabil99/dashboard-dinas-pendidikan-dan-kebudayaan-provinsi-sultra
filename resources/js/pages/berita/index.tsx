import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CalendarDays, Megaphone } from 'lucide-react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

const breadcrumbs: BreadcrumbItem[] = [
    { 
        title: 'Berita', 
        href: '/berita' 
    },
];

interface Media {
    id?: number;
    url?: string;
    file?: string;
}

interface Berita {
    id: number;
    judul: string;
    deskripsi: string;
    cover_image: string;
    medias?: Media | null; // relasi
    category: string;
    instansi: string;
    lokasi: string;
    created_at: string;
}

interface CustomPageProps {
    flash: { message?: string };
    berita: Berita[];
}

type PageProps = InertiaPageProps & CustomPageProps;

export default function Index() {
    const { berita, flash } = usePage<PageProps>().props;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, judul: string) => {
        if (!confirm(`Apakah anda yakin ingin menghapus "${judul}"?`)) return;
        destroy(route('berita.destroy', id));
    };

    const getCoverUrl = (item: Berita) => {
        const cover = item.cover_image;
        if (!cover) return '/images/default-cover.jpg';
        if (cover.startsWith('http') || cover.startsWith('https')) return cover;
        if (cover.includes('/')) {
            if (cover.startsWith('/storage/')) return cover;
            return `/storage/${cover}`;
        }
        return `/storage/berita/cover/${cover}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Berita" />

            {/* Tombol Tambah */}
            <div className="m-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Daftar Berita</h1>
                <Link href={route('berita.create')}>
                    <Button>Tambah</Button>
                </Link>
            </div>

            {/* Flash Message */}
            <div className="w-full md:w-1/2 px-4">
                {flash?.message && (
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>

            {/* Grid Card */}
            <div className="m-4">
                {berita && berita.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {berita.map((item) => (
                            <article
                                key={item.id}
                                className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
                            >
                                {/* Gambar */}
                                <img
                                    src={getCoverUrl(item)}
                                    alt={item.judul}
                                    className="w-full h-48 object-cover"
                                />

                                {/* Isi */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                                        {item.judul}
                                    </h2>

                                    <p className="text-gray-600 text-sm mb-2 line-clamp-3 min-h-[60px]">
                                        {item.deskripsi}
                                    </p>

                                    <p className="text-gray-500 text-sm flex items-center gap-2 mb-2">
                                        <CalendarDays className="w-4 h-4" />
                                        {new Date(item.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>

                                    {/* Aksi */}
                                    <div className="mt-auto flex gap-2">
                                        <Link href={route("berita.edit", item.id)} className="flex-1">
                                            <Button className="bg-blue-950 hover:bg-blue-900 w-full">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDelete(item.id, item.judul)}
                                            className="bg-red-600 hover:bg-red-500 flex-1"
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        <p className="mb-4">Belum ada berita</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

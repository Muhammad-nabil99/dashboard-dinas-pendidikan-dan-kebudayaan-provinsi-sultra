import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Galeri / Tambah',
        href: '/dashboard',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galeri / Buat" />
            <div className="m-4">
                <Link href={route('galeri.create')}>
                    <h1>Ini Tambah Galeri</h1>
                </Link>
            </div>
        </AppLayout>
    );
}
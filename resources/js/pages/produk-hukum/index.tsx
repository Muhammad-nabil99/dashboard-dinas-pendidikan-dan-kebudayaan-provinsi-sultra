import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk Hukum',
        href: '/produk-hukum',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk Hukum" />
            <div className="m-4">
                <Link href={route('produk-hukum.create')}>
                    <Button>Tambah</Button>
                </Link>
            </div>
        </AppLayout>
    );
}

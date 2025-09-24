import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Galeri',
        href: '/dashboard',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galeri" />
            <div className="m-4">
                <Link href={route('galeri.create')}>
                    <Button>Tambah</Button>
                </Link>
            </div>
        </AppLayout>
    );
}

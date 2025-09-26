import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Kegiatan',
        href: '/laporan-kegiatan',
    },
    {
        title: 'Edit Laporan Kegiatan',
        href: '/laporan-kegiatan/edit',
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
}

interface PageProps {
    laporanKegiatan: LaporanKegiatan;
}

export default function Edit() {
    const { laporanKegiatan } = usePage().props as unknown as PageProps;

    const { data, setData, put, errors } = useForm({
        judul: laporanKegiatan.judul,
        penyelenggara: laporanKegiatan.penyelenggara,
        lokasi: laporanKegiatan.lokasi,
        deskripsi: laporanKegiatan.deskripsi,
        file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('laporan-kegiatan.update', laporanKegiatan.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Laporan Kegiatan" />
            <div className="w-1/2 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className="h-4 w-4" />
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
                        <Label htmlFor="judul">Judul</Label>
                        <Input placeholder="Judul" value={data.judul} onChange={(e) => setData('judul', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="penyelenggara">Penyelenggara</Label>
                        <Input placeholder="Penyelenggara" value={data.penyelenggara} onChange={(e) => setData('penyelenggara', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="lokasi">Lokasi</Label>
                        <Input placeholder="Lokasi" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="deskripsi">Deskripsi</Label>
                        <Textarea placeholder="Deskripsi" value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)}></Textarea>
                    </div>
                    <div>
                        <Label htmlFor="file">File (Upload new file to replace)</Label>
                        <Input type="file" onChange={(e) => setData('file', e.target.files?.[0] || null)}></Input>
                    </div>
                    <Button type="submit">Update</Button>
                </form>
            </div>
        </AppLayout>
    );
}

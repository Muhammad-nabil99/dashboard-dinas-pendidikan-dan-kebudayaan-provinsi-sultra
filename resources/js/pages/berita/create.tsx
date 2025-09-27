import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Berita',
        href: '/berita/create',
    },
];

export default function Index() {
    const { data, setData, post, errors } = useForm({
        judul: '', 
        deskripsi: '',
        cover_image: null as File | null,
        file: null as File | null,
        category: '',
        instansi: '',
        lokasi: '',
    });

    const [previewCoverUrl, setPreviewCoverUrl] = useState<string | null>(null);
    const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('berita.store'), {
            forceFormData: true,
        });
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('cover_image', file);
            setPreviewCoverUrl(URL.createObjectURL(file));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('file', file);
            setPreviewFileUrl(URL.createObjectURL(file));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Berita" />
            <div className="flex flex-col md:flex-row gap-6 p-4">
                {/* FORM */}
                <div className="w-full md:w-1/2">
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
                            <Input
                                placeholder="Masukkan Judul"
                                value={data.judul}
                                onChange={(e) => setData("judul", e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="deskripsi">Deskripsi</Label>
                            <Textarea
                                placeholder="Deskripsi"
                                value={data.deskripsi}
                                onChange={(e) => setData("deskripsi", e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="cover_image">Cover Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleCoverImageChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="file">File</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="category">Kategori</Label>
                            <Select onValueChange={(val) => setData('category', val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="foto">Foto</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="instansi">Instansi</Label>
                            <Select onValueChange={(val) => setData('instansi', val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Instansi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="umum">Umum</SelectItem>
                                    <SelectItem value="sma">SMA</SelectItem>
                                    <SelectItem value="smk">SMK</SelectItem>
                                    <SelectItem value="slb">SLB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="lokasi">Lokasi</Label>
                            <Input
                                placeholder="Masukkan Lokasi"
                                value={data.lokasi}
                                onChange={(e) => setData("lokasi", e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full md:w-auto">
                            Tambah
                        </Button>
                    </form>
                </div>

                {/* PREVIEW */}
                <div className="w-full md:w-1/2">
                    <div className="border rounded overflow-hidden p-4 space-y-4">
                        {previewCoverUrl ? (
                            <div>
                                <p className="font-semibold">Preview Cover Image:</p>
                                <img src={previewCoverUrl} alt="Preview Cover" className="w-full h-64 object-cover rounded" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-64 border rounded text-gray-500">
                                Belum ada cover dipilih
                            </div>
                        )}

                        {previewFileUrl ? (
                            <div>
                                <p className="font-semibold">Preview File:</p>
                                <img src={previewFileUrl} alt="Preview File" className="w-full h-64 object-cover rounded" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-64 border rounded text-gray-500">
                                Belum ada file dipilih
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

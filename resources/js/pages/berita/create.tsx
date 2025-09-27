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
        file: [] as File[], // simpan semua file
        category: '',
        instansi: '',
        lokasi: '',
    });

    const [previewCoverUrl, setPreviewCoverUrl] = useState<string | null>(null);
    const [previewFileUrls, setPreviewFileUrls] = useState<string[]>([]);

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

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        const updatedFiles = [...data.file, ...newFiles]; // merge file baru + lama
        setData('file', updatedFiles);
        setPreviewFileUrls(updatedFiles.map((f) => URL.createObjectURL(f)));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Berita" />
        <div className="flex flex-col md:flex-row gap-6 p-4">
            {/* FORM */}
            <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
                <Label>File (bisa tambah berkali-kali)</Label>
                <div className="space-y-2">
                    <Button
                    type="button"
                    onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*,video/*";
                        input.multiple = true;
                        input.onchange = (e) => handleFilesChange(e as any);
                        input.click();
                    }}
                    >
                    + Tambah File
                    </Button>
                </div>
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

                {previewFileUrls.length > 0 ? (
                <div>
                    <p className="font-semibold">Preview File:</p>
                    <div className="grid grid-cols-2 gap-2">
                    {previewFileUrls.map((url, i) => (
                        <div key={i} className="relative">
                        {url.match(/video/) ? (
                            <video controls src={url} className="w-full h-40 object-cover rounded" />
                        ) : (
                            <img src={url} alt={`Preview File ${i}`} className="w-full h-40 object-cover rounded" />
                        )}
                        </div>
                    ))}
                    </div>
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

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Edit Berita', href: '/berita/edit' },
];

interface Media {
  id: number;
  file: string;
}

interface Berita {
  id: number;
  judul: string;
  deskripsi: string;
  cover_image: string | null;
  medias: Media | null; // ⬅️ bukan medias
  category: string;
  instansi: string;
  lokasi: string;
  created_at: string;
}

interface Props {
  berita: Berita;
}

export default function Edit({ berita }: Props) {
  const { data, setData, post, errors, progress } = useForm<{
    judul: string;
    deskripsi: string;
    cover_image?: File | null;
    file?: File | null;
    category: string;
    instansi: string;
    lokasi: string;
    _method?: string;
  }>({
    judul: berita.judul || '',
    deskripsi: berita.deskripsi || '',
    cover_image: undefined,
    file: undefined,
    category: berita.category || '',
    instansi: berita.instansi || '',
    lokasi: berita.lokasi || '',
  });

  // preview otomatis dari database
  const [previewCoverUrl, setPreviewCoverUrl] = useState<string | null>(
    berita.cover_image ? `/storage/${berita.cover_image}` : null
  );
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(
    berita.medias ? `/storage/${berita.medias.file}` : null
  );

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setData(prev => ({ ...prev, _method: 'PUT' }));
    post(route('berita.update', berita.id), { forceFormData: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Berita" />
      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Form Kiri */}
        <div className="w-full md:w-1/2 space-y-4">
          <form onSubmit={handleUpdate} className="space-y-4" encType="multipart/form-data">
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
                id="judul"
                placeholder="Masukkan Judul"
                value={data.judul}
                onChange={(e) => setData("judul", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
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
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setData("cover_image", file);
                    setPreviewCoverUrl(URL.createObjectURL(file));
                  }
                }}
              />
            </div>

            <div>
              <Label htmlFor="file">File</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setData("file", file);
                    setPreviewFileUrl(URL.createObjectURL(file));
                  }
                }}
              />
            </div>

            <div>
              <Label htmlFor="category">Kategori</Label>
              <Select value={data.category} onValueChange={(val) => setData('category', val)}>
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
              <Select value={data.instansi} onValueChange={(val) => setData('instansi', val)}>
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
                id="lokasi"
                placeholder="Masukkan Lokasi"
                value={data.lokasi}
                onChange={(e) => setData("lokasi", e.target.value)}
              />
            </div>

            {progress && (
              <div className="text-sm text-gray-500">
                Uploading: {progress.percentage}%
              </div>
            )}

            <Button type="submit" className="w-full md:w-auto">
              Simpan Perubahan
            </Button>
          </form>
        </div>

        {/* Preview Kanan */}
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

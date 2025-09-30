import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { CalendarDays, FileText, MapPin, Megaphone } from "lucide-react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Agenda",
    href: "/agenda",
  },
];

interface Media {
  id?: number;
  file?: string;
  type?: string;
}

interface Agenda {
  id: number;
  judul: string;
  deskripsi: string;
  coverImage: string | null;
  category: string;
  instansi: string;
  lokasi: string;
  penyelenggara: string;
  created_at: string;
  updated_at: string;
  medias?: {
    file: Media[];
  } | null;
}

interface CustomPageProps {
  flash: { message?: string };
  agenda: Agenda[];
}

type PageProps = InertiaPageProps & CustomPageProps;

export default function Index() {
  const { agenda, flash } = usePage<PageProps>().props;
  const { processing, delete: destroy } = useForm();

  const handleDelete = (id: number, judul: string) => {
    if (!confirm(`Apakah anda yakin ingin menghapus "${judul}"?`)) return;
    destroy(route("agenda.destroy", id));
  };

  const getCoverUrl = (item: Agenda) => {
    const cover = item.coverImage;
    if (!cover) return "/images/default-cover.jpg";
    if (cover.startsWith("http")) return cover;
    if (cover.includes("/")) {
      if (cover.startsWith("/storage/")) return cover;
      return `/storage/${cover}`;
    }
    return `/storage/agenda/cover/${cover}`;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Agenda" />

      {/* Header */}
      <div className="m-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Daftar Agenda</h1>
        <Link href={route("agenda.create")}>
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
        {agenda && agenda.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agenda.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
              >
                {/* Cover Image */}
                <img
                  src={getCoverUrl(item)}
                  alt={item.judul}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="capitalize text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {item.judul}
                  </h2>

                  <p className="text-gray-600 text-sm mb-2 line-clamp-3 min-h-[60px]">
                    {item.deskripsi}
                  </p>

                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Penyelenggara:</strong> {item.penyelenggara}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <MapPin className="inline h-4 w-4 mr-1 text-gray-500" />
                    {item.instansi} - {item.lokasi}
                  </p>

                  {/* Media files */}
                  {item.medias?.file && item.medias.file.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {item.medias.file.map((media, idx) => (
                        <a
                          key={idx}
                          href={
                            media?.file?.startsWith("http")
                              ? media.file
                              : `/storage/${media.file}`
                          }
                          target="_blank"
                          className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          Lihat File {idx + 1}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Date */}
                  <p className="text-gray-500 text-sm flex items-center gap-2 mb-2">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2">
                    <Link
                      href={route("agenda.edit", item.id)}
                      className="flex-1"
                    >
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
            <p className="mb-4">Belum ada agenda</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

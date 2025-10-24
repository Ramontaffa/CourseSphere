"use client";

import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Lesson } from "@/types";
import { EditLessonDialog } from "@molecules/EditLessonDialog/EditLessonDialog";
import { DeleteDialog } from "@molecules/DeleteDialog/DeleteDialog";
import { DummyImage } from "@/assets";

type LessonCardProps = {
  lesson: Lesson;
  currentUserId: string;
  onEdit?: (id: number, data: Partial<Lesson>) => void;
  onDelete?: (id: number | string) => Promise<void>;
};

function getVideoThumbnail(url: string): string {
  try {
    const youtubeMatch = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
    }

    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
    }

    return "";
  } catch {
    return "";
  }
}

export function LessonCard({
  lesson,
  currentUserId,
  onEdit,
  onDelete,
}: LessonCardProps) {
  const thumbnail = getVideoThumbnail(lesson.video_url);
  const canEditOrDelete = lesson.creator_id === currentUserId;

  const statusColors = {
    draft: "bg-yellow-100 text-yellow-800",
    published: "bg-green-100 text-green-800",
    archived: "bg-gray-200 text-gray-700",
  }[lesson.status];

  return (
    <div className="flex flex-col sm:flex-row gap-4 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 hover:shadow-sm hover:scale-101 transition-all duration-200 w-full">
      {/* Miniatura */}
      <div className="relative w-full sm:w-48 flex-shrink-0 h-40 sm:h-28">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={lesson.title}
            fill
            unoptimized
            className="object-cover rounded-sm"
          />
        ) : (
          <Image
            src={DummyImage}
            alt="placeholder"
            fill
            className="object-cover rounded-sm"
          />
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-center sm:items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 min-w-0">
              {lesson.title}
            </h3>

            {canEditOrDelete && (
              <div className="flex items-center gap-2 shrink-0">
                {onEdit && <EditLessonDialog lesson={lesson} onEdit={onEdit} />}
                {onDelete && <DeleteDialog id={lesson.id} onDelete={onDelete} />}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            <span
              className={`px-2 rounded-full text-xs font-medium ${statusColors}`}
            >
              {lesson.status === "draft"
                ? "Rascunho"
                : lesson.status === "published"
                ? "Publicado"
                : "Arquivado"}
            </span>
          </div>
        </div>

        {lesson.status === "published" && (
          <p className="text-xs text-zinc-500 mt-3 sm:mt-2 truncate">
            Publicado em:{" "}
            {format(new Date(lesson.publish_date), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
        )}
      </div>
    </div>
  );
}

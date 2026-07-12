import Image from "next/image";

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageRowProps {
  images: ImageItem[];
}

export function ImageRow({ images = [] }: ImageRowProps) {
  const clamped = images.slice(0, 3);
  return (
    <figure className="my-8">
      <div
        className={`grid gap-3 ${
          clamped.length === 1
            ? "grid-cols-1"
            : clamped.length === 2
            ? "grid-cols-2"
            : "grid-cols-3"
        }`}
      >
        {clamped.map((img, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {img.caption && (
              <figcaption className="text-center text-xs text-gray-500 dark:text-gray-400">
                {img.caption}
              </figcaption>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}

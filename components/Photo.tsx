import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * A fill image sized by its parent (which must have `position: relative`
 * and a height or aspect-ratio). The `.ph` class provides that.
 */
export default function Photo({ src, alt, sizes = "100vw", priority = false }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="photo-img"
    />
  );
}

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  slug: string;
  name: string;
  cat: string;
  tags: string[];
  order: number;
  client: string;
  year?: string;
  services?: string;
  deliverables?: string;
  summary?: string;
  /** may contain a single <b>…</b> emphasis; rendered as trusted HTML */
  approach?: string;
  cover: string;
  images: GalleryImage[];
};

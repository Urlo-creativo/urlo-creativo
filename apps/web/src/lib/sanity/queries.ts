import type { SanityImageSource } from "@sanity/image-url";

export type SanityClient = {
  _id: string;
  name: string;
  logo: SanityImageSource;
  url?: string;
  order?: number;
};

export const clientsQuery = `*[_type == "client"] | order(order asc) {
  _id,
  name,
  logo,
  url
}`;

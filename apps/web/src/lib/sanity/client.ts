import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId, readToken } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: readToken,
  useCdn: !readToken,
  perspective: "published",
});

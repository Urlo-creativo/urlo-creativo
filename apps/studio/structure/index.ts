import { CaseIcon, HomeIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set(["homePage", "servicesPage"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .id("homePage")
        .icon(HomeIcon)
        .schemaType("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Services page")
        .id("servicesPage")
        .icon(CaseIcon)
        .schemaType("servicesPage")
        .child(
          S.document().schemaType("servicesPage").documentId("servicesPage"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ""),
      ),
    ]);

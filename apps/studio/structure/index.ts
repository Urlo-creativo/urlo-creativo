import { CaseIcon, HomeIcon, InfoOutlineIcon, UserIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const customListTypes = new Set([
  "homePage",
  "servicesPage",
  "aboutPage",
  "person",
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenuti")
    .items([
      S.listItem()
        .title("Pagina home")
        .id("homePage")
        .icon(HomeIcon)
        .schemaType("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Pagina servizi")
        .id("servicesPage")
        .icon(CaseIcon)
        .schemaType("servicesPage")
        .child(
          S.document().schemaType("servicesPage").documentId("servicesPage"),
        ),
      S.listItem()
        .title("Pagina about")
        .id("aboutPage")
        .icon(InfoOutlineIcon)
        .schemaType("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.documentTypeListItem("person").title("Persone").icon(UserIcon),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !customListTypes.has(item.getId() ?? ""),
      ),
    ]);

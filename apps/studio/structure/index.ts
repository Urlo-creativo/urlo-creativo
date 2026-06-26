import {
  CaseIcon,
  HomeIcon,
  ImagesIcon,
  InfoOutlineIcon,
  UserIcon,
  UsersIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// Singleton pages first, then a divider, then the repeatable collections.
// Collections get explicit plural titles + icons so the most-edited content
// (Progetti) reads clearly instead of inheriting the singular schema title.
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
      S.divider(),
      S.documentTypeListItem("project").title("Progetti").icon(ImagesIcon),
      S.documentTypeListItem("person").title("Persone").icon(UserIcon),
      S.documentTypeListItem("client")
        .title("Clienti selezionati")
        .icon(UsersIcon),
    ]);

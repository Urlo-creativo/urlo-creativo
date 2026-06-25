import { CaseIcon, HomeIcon, InfoOutlineIcon, UserIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const customListTypes = new Set(["homePage", "servicesPage", "aboutPage", "person"]);

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
      S.listItem()
        .title("About page")
        .id("aboutPage")
        .icon(InfoOutlineIcon)
        .schemaType("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.documentTypeListItem("person").title("People").icon(UserIcon),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !customListTypes.has(item.getId() ?? ""),
      ),
    ]);

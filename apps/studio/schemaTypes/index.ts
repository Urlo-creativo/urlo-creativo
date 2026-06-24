import { clientType } from "./client";
import { homePageType } from "./homePage";
import { projectType } from "./project";
import { localizedRichTextType } from "./objects/localizedRichText";
import { localizedStringType } from "./objects/localizedString";
import { localizedTextType } from "./objects/localizedText";
import { projectCreditType } from "./objects/projectCredit";
import { projectMediaItemType } from "./objects/projectMediaItem";
import { projectMediaSectionType } from "./objects/projectMediaSection";

export const schemaTypes = [
  homePageType,
  clientType,
  projectType,
  localizedStringType,
  localizedTextType,
  localizedRichTextType,
  projectMediaSectionType,
  projectMediaItemType,
  projectCreditType,
];

import { aboutPageType } from "./aboutPage";
import { clientType } from "./client";
import { homePageType } from "./homePage";
import { personType } from "./person";
import { projectType } from "./project";
import { servicesPageType } from "./servicesPage";
import { localizedRichTextType } from "./objects/localizedRichText";
import { localizedStringType } from "./objects/localizedString";
import { localizedTextType } from "./objects/localizedText";
import { projectCreditType } from "./objects/projectCredit";
import { projectMediaItemType } from "./objects/projectMediaItem";
import { projectMediaSectionType } from "./objects/projectMediaSection";

export const schemaTypes = [
  homePageType,
  servicesPageType,
  aboutPageType,
  personType,
  clientType,
  projectType,
  localizedStringType,
  localizedTextType,
  localizedRichTextType,
  projectMediaSectionType,
  projectMediaItemType,
  projectCreditType,
];

import { clientType } from "./client";
import { projectType } from "./project";
import { localizedStringType } from "./objects/localizedString";
import { localizedTextType } from "./objects/localizedText";
import { projectCreditType } from "./objects/projectCredit";
import { projectMediaItemType } from "./objects/projectMediaItem";
import { projectMediaSectionType } from "./objects/projectMediaSection";

export const schemaTypes = [
  clientType,
  projectType,
  localizedStringType,
  localizedTextType,
  projectMediaSectionType,
  projectMediaItemType,
  projectCreditType,
];

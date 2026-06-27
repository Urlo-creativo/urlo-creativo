import { hasImageAsset } from "@/lib/sanity/image";
import type {
  Project,
  ProjectMediaItem,
  ProjectMediaPlacement,
  ProjectMediaSection,
} from "@/lib/sanity/queries";
import { nonEmptyStringList } from "@/lib/text";

export function projectDisplayTitle(
  project: Pick<Project, "clientName" | "projectName">,
) {
  return [project.clientName, project.projectName].filter(Boolean).join(": ");
}

export function isRenderableProjectMediaItem(
  item: ProjectMediaItem | null | undefined,
): item is ProjectMediaItem {
  if (!item) return false;

  return item.mediaType === "video"
    ? Boolean(item.videoUrl || item.videoFile)
    : hasImageAsset(item.image);
}

export function projectMediaSectionsByPlacement(
  sections: ProjectMediaSection[] | null | undefined,
): Record<ProjectMediaPlacement, ProjectMediaSection[]> {
  const grouped: Record<ProjectMediaPlacement, ProjectMediaSection[]> = {
    afterConcept: [],
    afterResponsibilities: [],
    afterOutcome: [],
    behindTheScenes: [],
  };

  for (const section of sections ?? []) {
    if (section.placement in grouped) {
      grouped[section.placement].push(section);
    }
  }

  return grouped;
}

export function projectResponsibilities(
  value: Project["responsibilities"],
): string[] {
  return nonEmptyStringList(value);
}

export const projectCategoryPillStyles = [
  "pill-button-yellow",
  "pill-button-pink",
  "pill-button-blue",
] as const;

export function projectCategoryPillClass(index: number) {
  return projectCategoryPillStyles[index % projectCategoryPillStyles.length];
}

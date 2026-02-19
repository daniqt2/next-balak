/**
 * Shared constants and helpers for route group tags (Gravel / Carretera).
 * Contentful tag ids: routeGroupGravel -> "Gravel", routeGroupRoad -> "Carretera".
 */

export const ROUTE_GROUP_TAG_GRAVEL = 'routeGroupGravel';
export const ROUTE_GROUP_TAG_ROAD = 'routeGroupRoad';

/** Map tag id -> display label */
export const ROUTE_GROUP_TAG_LABELS: Record<string, string> = {
  [ROUTE_GROUP_TAG_GRAVEL]: 'Gravel',
  [ROUTE_GROUP_TAG_ROAD]: 'Carretera',
};

/** Filter chip options: Todos, Gravel, Carretera */
export const ROUTE_GROUP_FILTERS = [
  { id: null, label: 'Todos' },
  { id: ROUTE_GROUP_TAG_GRAVEL, label: ROUTE_GROUP_TAG_LABELS[ROUTE_GROUP_TAG_GRAVEL] },
  { id: ROUTE_GROUP_TAG_ROAD, label: ROUTE_GROUP_TAG_LABELS[ROUTE_GROUP_TAG_ROAD] },
] as const;

/**
 * Returns the display label for a known tag id, or undefined if not one of our tags.
 */
export function getRouteGroupTagLabel(tagId: string): string | undefined {
  return ROUTE_GROUP_TAG_LABELS[tagId] ?? ROUTE_GROUP_TAG_LABELS[tagId?.toLowerCase()];
}

/**
 * Maps Contentful tags to our display labels (Gravel / Carretera only).
 * Uses ROUTE_GROUP_TAG_LABELS to map tag id -> label; falls back to tag.name if it matches a known label.
 */
export function getRouteGroupDisplayLabels(tags: Array<{ id?: string | null; name?: string | null } | null>): string[] {
  const labels = new Set<string>();
  const knownLabels = Object.values(ROUTE_GROUP_TAG_LABELS);

  for (const tag of tags) {
    if (!tag) continue;
    const id = (tag.id ?? '').trim();
    const name = (tag.name ?? '').trim();
    const label = ROUTE_GROUP_TAG_LABELS[id] ?? ROUTE_GROUP_TAG_LABELS[id.toLowerCase()] ?? (knownLabels.includes(name) ? name : undefined);
    if (label) labels.add(label);
  }

  return Array.from(labels);
}

/**
 * Returns true if the route group has the given tag (by id or by label name).
 */
export function hasRouteGroupTag(
  tags: Array<{ id?: string | null; name?: string | null } | null> | undefined,
  tagId: string,
  tagLabel: string
): boolean {
  if (!tags?.length) return false;
  const tagIdLower = tagId?.toLowerCase() ?? '';
  const tagLabelLower = tagLabel?.toLowerCase() ?? '';
  return tags.some(
    (t) =>
      t?.id?.toLowerCase() === tagIdLower ||
      t?.name?.toLowerCase() === tagLabelLower
  );
}

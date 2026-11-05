import type { PresentationMeta, PresentationRecord } from "./types";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

/**
 * Validates a `presentation.json` payload. Returns the record or a message
 * naming what is wrong, so a broken deck reports itself instead of throwing
 * somewhere deep in the render tree.
 */
export function parseMeta(
  slug: string,
  raw: unknown,
): { ok: true; record: PresentationRecord } | { ok: false; error: string } {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, error: `presentation.json in "${slug}" is not an object.` };
  }

  const data = raw as Record<string, unknown>;
  const problems: string[] = [];

  if (!isNonEmptyString(data.title)) problems.push('"title" must be a non-empty string');
  if (!isNonEmptyString(data.description)) problems.push('"description" must be a non-empty string');
  if (data.course !== undefined && typeof data.course !== "string") {
    problems.push('"course" must be a string when present');
  }
  if (!isNonEmptyString(data.date) || !ISO_DATE.test(data.date)) {
    problems.push('"date" must be an ISO date (YYYY-MM-DD)');
  }
  if (data.visibility !== "public" && data.visibility !== "private") {
    problems.push('"visibility" must be "public" or "private"');
  }

  if (problems.length > 0) {
    return { ok: false, error: `presentation.json in "${slug}" is invalid: ${problems.join("; ")}.` };
  }

  const course = isNonEmptyString(data.course) ? data.course.trim() : undefined;

  return {
    ok: true,
    record: {
      slug,
      title: (data.title as string).trim(),
      description: (data.description as string).trim(),
      date: data.date as string,
      visibility: data.visibility as "public" | "private",
      ...(course ? { course } : {}),
    },
  };
}

/** True when a deck may ship in a production build. Dev shows everything. */
export function isVisibleInBuild(record: PresentationMeta, isProd: boolean): boolean {
  return isProd ? record.visibility === "public" : true;
}

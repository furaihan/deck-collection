import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PresentationCard } from "@/components/presentation/PresentationCard";
import { invalidPresentations, presentationEntries } from "@/presentations/registry";

type SortMode = "newest" | "title";

// Base UI's Select renders the raw value unless it is given the item list,
// so the trigger can show "Newest first" instead of "newest".
const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "title", label: "Title A–Z" },
];

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matched = needle
      ? presentationEntries.filter((entry) =>
          [entry.title, entry.description, entry.course ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(needle),
        )
      : [...presentationEntries];

    return matched.sort((a, b) =>
      sort === "newest"
        ? b.date.localeCompare(a.date) || a.title.localeCompare(b.title)
        : a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    );
  }, [query, sort]);

  const total = presentationEntries.length;
  const brokenSlugs = new Set(invalidPresentations.map((bad) => bad.slug));

  return (
    <div>
      <header className="border-b border-foreground/15 pb-7">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
          <div className="max-w-[52ch]">
            <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
              Every deck,
              <br />
              <span className="relative inline-block">
                one folder away.
                <span
                  className="absolute inset-x-0 -bottom-1 h-[6px] bg-gold"
                  aria-hidden
                />
              </span>
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              {total === 0
                ? "Nothing here yet. Add a folder to presentations/ and it will appear."
                : total +
                  " " +
                  (total === 1 ? "deck" : "decks") +
                  " found by reading presentations/. No registry, no upload, no editing — a deck exists because its folder does."}
            </p>
          </div>

          <div className="flex w-full max-w-full flex-col gap-2 sm:w-auto sm:min-w-[320px]">
            <label htmlFor="library-search" className="sr-only">
              Search decks by title, description, or course
            </label>
            <InputGroup className="h-10 bg-card">
              <InputGroupAddon>
                <Search aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                id="library-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, course, description"
                className="text-[13px] sm:w-[240px]"
                autoComplete="off"
                spellCheck={false}
              />
              {query ? (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                  >
                    <X aria-hidden />
                  </InputGroupButton>
                </InputGroupAddon>
              ) : null}
            </InputGroup>

            <Select
              value={sort}
              onValueChange={(value) => setSort(value as SortMode)}
              items={SORT_OPTIONS}
            >
              <SelectTrigger className="h-10 w-full" aria-label="Sort decks">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {invalidPresentations.length > 0 ? (
        <ul className="mt-5 space-y-1.5" aria-label="Decks that could not be read">
          {invalidPresentations.map((bad) => (
            <li key={bad.slug} className="flex gap-2 text-[12.5px] leading-snug">
              <span className="mt-[3px] size-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
              <span>
                <span className="font-mono text-[11px] text-signal">{bad.slug}</span>{" "}
                <span className="text-muted-foreground">{bad.error}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <section className="mt-8" aria-live="polite">
        {total === 0 ? (
          <EmptyLibrary />
        ) : visible.length === 0 ? (
          <NoMatches query={query} onClear={() => setQuery("")} />
        ) : (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((entry) => (
              <li key={entry.slug}>
                <PresentationCard entry={entry} invalid={brokenSlugs.has(entry.slug)} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

const FOLDER_TREE = [
  "presentations/my-deck/",
  "  presentation.json",
  "  Presentation.tsx",
  "  slides/Slide01.tsx",
  "  assets/",
].join("\n");

function EmptyLibrary() {
  return (
    <div className="border border-dashed border-foreground/25 px-6 py-16 text-center">
      <h2 className="text-lg font-semibold tracking-[-0.01em]">The library is empty</h2>
      <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
        Add a folder to the repository and it will show up here on save.
      </p>
      <pre className="mx-auto mt-6 w-fit border border-foreground/15 bg-card px-4 py-3 text-left font-mono text-[11.5px] leading-relaxed text-muted-foreground">
        {FOLDER_TREE}
      </pre>
    </div>
  );
}

function NoMatches({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="border border-dashed border-foreground/25 px-6 py-14 text-center">
      <h2 className="text-base font-semibold tracking-[-0.01em]">
        Nothing matches “{query}”
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
        Search looks at a deck's title, description, and course.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 text-[13px] font-medium text-signal underline underline-offset-4"
      >
        Clear the search
      </button>
    </div>
  );
}

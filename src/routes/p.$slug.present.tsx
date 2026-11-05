import { createFileRoute, notFound } from "@tanstack/react-router";
import { Presenter } from "@/components/presentation/Presenter";
import { useSlides } from "@/presentations/useSlides";
import { findEntry } from "@/presentations/registry";

interface PresentSearch {
  slide: number;
}

export const Route = createFileRoute("/p/$slug/present")({
  validateSearch: (search: Record<string, unknown>): PresentSearch => {
    const raw = Number(search.slide);
    return { slide: Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : 1 };
  },
  component: PresentRoute,
});

function PresentRoute() {
  const { slug } = Route.useParams();
  const entry = findEntry(slug);
  if (!entry) throw notFound();

  const slides = useSlides(entry);
  const { slide } = Route.useSearch();
  const navigate = Route.useNavigate();

  if (slides.status !== "ready") {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-black">
        {slides.status === "error" ? (
          <div className="max-w-lg px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              {entry.title}
            </p>
            <p className="mt-3 text-lg text-white">This deck failed to load.</p>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{slides.error.message}</p>
            <button
              type="button"
              onClick={() => void navigate({ to: "/p/$slug", params: { slug } })}
              className="mt-6 text-sm text-white/70 underline underline-offset-4 hover:text-white"
            >
              Back to the overview
            </button>
          </div>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            Loading
          </span>
        )}
      </div>
    );
  }

  // A shared link may point past the end of the deck; the presenter clamps.
  const index = Math.min(Math.max(slide - 1, 0), slides.slides.length - 1);

  return (
    <Presenter
      slides={slides.slides}
      title={entry.title}
      index={index}
      onIndexChange={(next) =>
        void navigate({
          to: "/p/$slug/present",
          params: { slug },
          search: { slide: next + 1 },
          replace: true,
        })
      }
      onExit={() => void navigate({ to: "/p/$slug", params: { slug } })}
    />
  );
}

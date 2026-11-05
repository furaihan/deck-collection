import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/shell/AppShell";

function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.01em]">No sheet at this address</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The deck may have been moved out of <code className="font-mono text-xs">presentations/</code>,
          or the link is wrong.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
        >
          Back to the library
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

import { createServer, type Logger } from "vite";

/**
 * Vite's own console output would drown the validator's one-line-per-problem
 * report. Everything that matters (a module that cannot resolve, a component
 * that throws) surfaces as a console error or a failed request in the browser
 * checks instead.
 */
const quiet: Logger = {
  info: () => undefined,
  warn: () => undefined,
  warnOnce: () => undefined,
  error: () => undefined,
  clearScreen: () => undefined,
  hasWarned: false,
  hasErrorLogged: () => false,
};

export interface DevServerHandle {
  url: string;
  close: () => Promise<void>;
}

/**
 * Starts a Vite **dev** server on a free port and resolves once it is listening.
 *
 * The exporter and the validator both need one: private decks are removed from
 * production builds, so the only way to reach them is the dev server.
 */
export async function startDevServer(): Promise<DevServerHandle> {
  const server = await createServer({
    root: process.cwd(),
    customLogger: quiet,
    logLevel: "silent",
    clearScreen: false,
    server: {
      host: "127.0.0.1",
      port: 0,
      strictPort: false,
      open: false,
    },
  });

  await server.listen();

  const resolved = server.resolvedUrls?.local?.[0];
  const address = server.httpServer?.address();
  const port = typeof address === "object" && address ? address.port : undefined;

  const url = (resolved ?? `http://127.0.0.1:${port ?? ""}`).replace(/\/$/, "");
  if (!url || !port) {
    await server.close();
    throw new Error("Could not determine the dev server URL.");
  }

  return {
    url,
    close: async () => {
      await server.close();
    },
  };
}
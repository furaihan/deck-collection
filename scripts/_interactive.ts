import { createInterface } from "node:readline/promises";
import { listDecks, type TargetSelection } from "./_decks";

export interface InteractiveSelection {
  selection: TargetSelection | null;
  exitCode: number;
}

export function isInteractiveTerminal(): boolean {
  return Boolean(process.stdin.isTTY && process.stdout.isTTY);
}

/** Let a person choose one deck or all decks without adding a dependency. */
export async function chooseTargets(action: "validate" | "export"): Promise<InteractiveSelection> {
  const decks = listDecks();
  const allIndex = decks.length;
  const labels = [...decks.map((deck) => deck.slug), "All presentations"];
  let selected = 0;

  return new Promise((resolve) => {
    const stdin = process.stdin;
    let finished = false;

    const render = () => {
      const lines = [
        `Select a presentation to ${action}:`,
        "",
        ...labels.map((label, index) => `${index === selected ? "❯" : " "} ${label}`),
        "",
        "↑/↓ or j/k to move • Enter to select • Esc to cancel",
      ];
      process.stdout.write(`\x1b[2J\x1b[H${lines.join("\n")}\n`);
    };

    const finish = (selection: TargetSelection | null, exitCode: number) => {
      if (finished) return;
      finished = true;
      stdin.off("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      process.stdout.write("\x1b[?25h\x1b[2J\x1b[H");
      if (selection) {
        const label = selected === allIndex ? "all presentations" : decks[selected]!.slug;
        process.stdout.write(`${action === "validate" ? "Validating" : "Exporting"} ${label}...\n\n`);
      } else {
        process.stdout.write(`${action[0]!.toUpperCase()}${action.slice(1)} cancelled.\n`);
      }
      resolve({ selection, exitCode });
    };

    const onData = (chunk: string | Buffer) => {
      const input = chunk.toString();

      if (input.includes("\u001b[A") || input === "k") {
        selected = (selected - 1 + labels.length) % labels.length;
        render();
        return;
      }
      if (input.includes("\u001b[B") || input === "j") {
        selected = (selected + 1) % labels.length;
        render();
        return;
      }
      if (input === "\u0003") {
        finish(null, 130);
        return;
      }
      if (input === "\u001b") {
        finish(null, 0);
        return;
      }
      if (input === "\r" || input === "\n") {
        const selection =
          selected === allIndex
            ? { slugs: decks.map((deck) => deck.slug), all: true }
            : { slugs: [decks[selected]!.slug], all: false };
        finish(selection, 0);
      }
    };

    process.stdout.write("\x1b[?25l");
    stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    stdin.on("data", onData);
    stdin.resume();
    render();
  });
}

/** Ask before replacing an existing PDF. Enter and n both mean no. */
export async function confirmOverwrite(displayPath: string): Promise<boolean> {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await readline.question(`${displayPath} already exists. Overwrite it? [y/N] `);
    return /^y(?:es)?$/i.test(answer.trim());
  } finally {
    readline.close();
  }
}

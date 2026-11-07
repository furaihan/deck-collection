import { CodeBlock } from "../CodeBlock";
import { CropMark, Label, Prose, Sheet, Title } from "../Frame";
import { C, T, TOTAL } from "../theme";

const BEFORE = `const value = await cache.get(key)
if (value) return value

// two tabs can miss at once
const next = await load(key)
await cache.set(key, next)
return next`;

const AFTER = `const value = await cache.get(key)
if (value) return value

// two writers can both miss
const inflight = cache.get(pending)
if (!inflight) cache.set(pending, load(key))

const next = await cache.get(pending)
await cache.set(key, next)
return next`;

/**
 * The payoff: the same code before and after, with the change marked.
 * Decoration is what makes syntax colour worth the bundle — the reader is being
 * shown a line, not just shown code.
 */
export default function Slide04() {
  return (
    <Sheet n={4} total={TOTAL} section="The payoff">
      <CropMark corner="tl" />
      <CropMark corner="br" />

      <Title size={58} max={1240}>
        Colour explains the syntax. A mark explains the change.
      </Title>

      <div style={{ display: "flex", gap: 40, marginTop: 34, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Label>Before</Label>
          <CodeBlock code={BEFORE} width={840} size={28} title="cache.ts" lineNumbers={false} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Label color={C.risoDeep}>After · two lines added</Label>
          <CodeBlock
            code={AFTER}
            width={860}
            size={28}
            title="cache.ts"
            focus={[5, 6]}
            mark={{ line: 5, text: "const inflight" }}
            lineNumbers={false}
          />
        </div>
      </div>

      <Prose size={T.small} max={1560} style={{ marginTop: "auto" }}>
        <span style={{ color: C.ink, fontWeight: 600 }}>focus</span> lights whole rows;{" "}
        <span style={{ color: C.ink, fontWeight: 600 }}>mark</span> underlines the one fragment
        under discussion. Both are ordinary line and range decorations, styled by the deck.
      </Prose>
    </Sheet>
  );
}

// @vitest-environment node
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Integrity guard for the vendored Firebase UI reference layer (ADR 0008).
// src/components/firebase is read-only by architecture, not by file permission:
// every file must match the approved SHA-256 manifest. Only the update
// procedure in the ADR may regenerate the manifest; this test never does.

const root = path.resolve(import.meta.dirname, "../..");
const referenceDir = path.join(root, "src/components/firebase");
const manifestPath = path.join(
  import.meta.dirname,
  "firebase-reference.manifest.sha256",
);

type Hashes = Record<string, string>;

type Differences = {
  added: string[];
  removed: string[];
  modified: string[];
};

// CRLF is normalized to LF so a checkout with either line ending hashes the same.
function hashContent(content: string): string {
  return createHash("sha256")
    .update(content.replace(/\r\n/g, "\n"))
    .digest("hex");
}

function listFiles(directory: string, prefix = ""): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? listFiles(path.join(directory, entry.name), `${prefix}${entry.name}/`)
      : [`${prefix}${entry.name}`],
  );
}

function hashReferenceFiles(): Hashes {
  const hashes: Hashes = {};

  if (!existsSync(referenceDir)) {
    return hashes;
  }

  for (const file of listFiles(referenceDir).sort()) {
    hashes[file] = hashContent(
      readFileSync(path.join(referenceDir, file), "utf8"),
    );
  }

  return hashes;
}

function parseManifest(manifest: string): Hashes {
  const hashes: Hashes = {};

  for (const line of manifest.replace(/\r\n/g, "\n").split("\n")) {
    const separator = line.indexOf("  ");

    if (separator > 0) {
      hashes[line.slice(separator + 2)] = line.slice(0, separator);
    }
  }

  return hashes;
}

function compare(expected: Hashes, actual: Hashes): Differences {
  return {
    added: Object.keys(actual).filter((file) => !(file in expected)),
    removed: Object.keys(expected).filter((file) => !(file in actual)),
    modified: Object.keys(expected).filter(
      (file) => file in actual && expected[file] !== actual[file],
    ),
  };
}

function isIntact(differences: Differences): boolean {
  return (
    differences.added.length === 0 &&
    differences.removed.length === 0 &&
    differences.modified.length === 0
  );
}

describe("compare", () => {
  const baseline: Hashes = { "a.tsx": "1", "b.tsx": "2" };

  it("accepts identical hashes", () => {
    expect(isIntact(compare(baseline, { ...baseline }))).toBe(true);
  });

  it("detects a modified file", () => {
    expect(compare(baseline, { ...baseline, "a.tsx": "9" })).toEqual({
      added: [],
      removed: [],
      modified: ["a.tsx"],
    });
  });

  it("detects a deleted file", () => {
    expect(compare(baseline, { "a.tsx": "1" })).toEqual({
      added: [],
      removed: ["b.tsx"],
      modified: [],
    });
  });

  it("detects an unexpected new file", () => {
    expect(compare(baseline, { ...baseline, "c.tsx": "3" })).toEqual({
      added: ["c.tsx"],
      removed: [],
      modified: [],
    });
  });
});

describe("hashContent", () => {
  it("ignores the line ending style", () => {
    expect(hashContent("one\r\ntwo\r\n")).toBe(hashContent("one\ntwo\n"));
  });

  it("changes when the content changes", () => {
    expect(hashContent("one\n")).not.toBe(hashContent("two\n"));
  });
});

describe("Firebase UI reference layer", () => {
  it("has an approved manifest", () => {
    expect(existsSync(manifestPath)).toBe(true);
    expect(
      Object.keys(parseManifest(readFileSync(manifestPath, "utf8"))).length,
    ).toBeGreaterThan(0);
  });

  it("matches the approved SHA-256 manifest exactly", () => {
    const differences = compare(
      parseManifest(readFileSync(manifestPath, "utf8")),
      hashReferenceFiles(),
    );

    // On failure the object lists every added, removed, and modified file.
    expect(differences).toEqual({ added: [], removed: [], modified: [] });
  });
});

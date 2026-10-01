import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeSubFoldersFromTheFilesystem as removeSubfolders } from ".";

/** Checks every folder against every other. */
const byBruteForce = (folder: string[]): string[] =>
	folder
		.filter((path) => !folder.some((other) => path.startsWith(`${other}/`)))
		.sort();

describe("1233. Remove Sub-Folders from the Filesystem", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeSubfolders(["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"])).toEqual([
			"/a",
			"/c/d",
			"/c/f",
		]);
		expect(removeSubfolders(["/a", "/a/b/c", "/a/b/d"])).toEqual(["/a"]);
		expect(removeSubfolders(["/a/b/c", "/a/b/ca", "/a/b/d"])).toEqual([
			"/a/b/c",
			"/a/b/ca",
			"/a/b/d",
		]);
	});

	it("keeps a sibling that shares a prefix", () => {
		// "/" sorts before letters, so "/a/b" lands between "/a" and "/ab".
		expect(removeSubfolders(["/ab", "/a/b", "/a"])).toEqual(["/a", "/ab"]);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1233);
		for (let run = 0; run < 300; run++) {
			const folder = [
				...new Set(
					Array.from({ length: random.int(1, 8) }, () =>
						Array.from(
							{ length: random.int(1, 3) },
							() => `/${random.string(random.int(1, 2), "ab")}`,
						).join(""),
					),
				),
			];
			expect(removeSubfolders(folder)).toEqual(byBruteForce(folder));
		}
	});
});

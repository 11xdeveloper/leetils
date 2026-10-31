import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findSubtreeSizesAfterChanges as findSubtreeSizes } from ".";

/** Walks up to find each new parent, then counts descendants. */
const byBruteForce = (parent: number[], s: string): number[] => {
	const moved = parent.map((p, node) => {
		for (let up = p; up >= 0; up = parent[up] ?? -1)
			if (s[up] === s[node]) return up;
		return p;
	});
	return parent.map((_, node) => {
		let count = 0;
		parent.forEach((_, other) => {
			for (let at = other; at >= 0; at = moved[at] ?? -1)
				if (at === node) {
					count++;
					break;
				}
		});
		return count;
	});
};

describe("3331. Find Subtree Sizes After Changes", () => {
	it("solves the examples from the problem statement", () => {
		expect(findSubtreeSizes([-1, 0, 0, 1, 1, 1], "abaabc")).toEqual([
			6, 3, 1, 1, 1, 1,
		]);
		expect(findSubtreeSizes([-1, 0, 4, 0, 1], "abbba")).toEqual([
			5, 2, 1, 1, 1,
		]);
	});

	it("matches walking up for every node on random trees", () => {
		const random = createRandom(3331);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const parent = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const s = random.string(n, "abc");
			expect(findSubtreeSizes(parent, s)).toEqual(byBruteForce(parent, s));
		}
	});
});

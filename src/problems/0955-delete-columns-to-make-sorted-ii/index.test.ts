import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { deleteColumnsToMakeSortedII as minDeletionSize } from ".";

/** Tries every set of kept columns. */
const byBruteForce = (strs: string[]): number => {
	const width = strs[0]?.length ?? 0;
	let best = width;
	for (let mask = 0; mask < 1 << width; mask++) {
		const kept = strs.map((row) =>
			[...row].filter((_, c) => mask & (1 << c)).join(""),
		);
		if (kept.every((row, r) => r === 0 || (kept[r - 1] ?? "") <= row)) {
			let size = 0;
			for (let bits = mask; bits; bits &= bits - 1) size++;
			best = Math.min(best, width - size);
		}
	}
	return best;
};

describe("955. Delete Columns to Make Sorted II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDeletionSize(["ca", "bb", "ac"])).toBe(1);
		expect(minDeletionSize(["xc", "yb", "za"])).toBe(0);
		expect(minDeletionSize(["zyx", "wvu", "tsr"])).toBe(3);
	});

	it("matches trying every set of columns on random grids", () => {
		const random = createRandom(955);
		for (let run = 0; run < 500; run++) {
			const width = random.int(1, 5);
			const strs = Array.from({ length: random.int(1, 5) }, () =>
				random.string(width, "abc"),
			);
			expect(minDeletionSize(strs)).toBe(byBruteForce(strs));
		}
	});
});

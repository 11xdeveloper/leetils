import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { deleteColumnsToMakeSortedIII as minDeletionSize } from ".";

describe("960. Delete Columns to Make Sorted III", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDeletionSize(["babca", "bbazb"])).toBe(3);
		expect(minDeletionSize(["edcba"])).toBe(4);
		expect(minDeletionSize(["ghi", "def", "abc"])).toBe(0);
	});

	it("matches trying every set of columns on random grids", () => {
		const random = createRandom(960);
		for (let run = 0; run < 500; run++) {
			const width = random.int(1, 7);
			const strs = Array.from({ length: random.int(1, 4) }, () =>
				random.string(width, "abc"),
			);
			let best = width;
			for (let mask = 0; mask < 1 << width; mask++) {
				const kept = strs.map((row) =>
					[...row].filter((_, c) => mask & (1 << c)),
				);
				if (
					kept.every((row) =>
						row.every((char, i) => i === 0 || (row[i - 1] ?? "") <= char),
					)
				) {
					best = Math.min(best, width - (kept[0]?.length ?? 0));
				}
			}
			expect(minDeletionSize(strs)).toBe(best);
		}
	});
});

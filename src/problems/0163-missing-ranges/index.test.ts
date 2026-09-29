import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { missingRanges } from ".";

/** Expands the ranges back into the numbers they cover. */
const expand = (ranges: number[][]): number[] =>
	ranges.flatMap(([start = 0, end = 0]) =>
		Array.from({ length: end - start + 1 }, (_, i) => start + i),
	);

describe("163. Missing Ranges", () => {
	it("solves the examples from the problem statement", () => {
		expect(missingRanges([0, 1, 3, 50, 75], 0, 99)).toEqual([
			[2, 2],
			[4, 49],
			[51, 74],
			[76, 99],
		]);
		expect(missingRanges([-1], -1, -1)).toEqual([]);
	});

	it("returns the whole range when nums is empty", () => {
		expect(missingRanges([], 1, 1)).toEqual([[1, 1]]);
		expect(missingRanges([], -1e9, 1e9)).toEqual([[-1e9, 1e9]]);
	});

	it("covers exactly the missing numbers, with no two ranges joinable, on random inputs", () => {
		const random = createRandom(163);
		for (let run = 0; run < 500; run++) {
			const lower = random.int(-10, 10);
			const upper = lower + random.int(0, 15);
			const nums = [
				...new Set(random.array(random.int(0, 10), lower, upper)),
			].toSorted((a, b) => a - b);
			const ranges = missingRanges(nums, lower, upper);
			const missing = Array.from(
				{ length: upper - lower + 1 },
				(_, i) => lower + i,
			).filter((x) => !nums.includes(x));
			expect(expand(ranges)).toEqual(missing);
			for (let i = 1; i < ranges.length; i++) {
				expect(
					(ranges[i]?.[0] ?? 0) - (ranges[i - 1]?.[1] ?? 0),
				).toBeGreaterThan(1);
			}
		}
	});
});

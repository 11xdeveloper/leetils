import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { summaryRanges } from ".";

/** Expands the ranges back into the values they cover. */
const expand = (ranges: string[]): number[] =>
	ranges.flatMap((range) => {
		const [start = 0, end = start] = range.split("->").map(Number);
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	});

describe("228. Summary Ranges", () => {
	it("solves the examples from the problem statement", () => {
		expect(summaryRanges([0, 1, 2, 4, 5, 7])).toEqual(["0->2", "4->5", "7"]);
		expect(summaryRanges([0, 2, 3, 4, 6, 8, 9])).toEqual([
			"0",
			"2->4",
			"6",
			"8->9",
		]);
		expect(summaryRanges([])).toEqual([]);
	});

	it("handles negative numbers and the 32-bit limits", () => {
		expect(summaryRanges([-3, -2, -1, 1])).toEqual(["-3->-1", "1"]);
		expect(summaryRanges([-(2 ** 31), 2 ** 31 - 1])).toEqual([
			"-2147483648",
			"2147483647",
		]);
	});

	it("covers exactly the values, with no two ranges joinable, on random inputs", () => {
		const random = createRandom(228);
		for (let run = 0; run < 500; run++) {
			const nums = [
				...new Set(random.array(random.int(0, 15), -10, 10)),
			].toSorted((a, b) => a - b);
			const ranges = summaryRanges(nums);
			expect(expand(ranges)).toEqual(nums);
			const bounds = ranges.map((range) => range.split("->").map(Number));
			for (let i = 1; i < bounds.length; i++) {
				expect(
					(bounds[i]?.[0] ?? 0) - (bounds[i - 1]?.at(-1) ?? 0),
				).toBeGreaterThan(1);
			}
		}
	});
});

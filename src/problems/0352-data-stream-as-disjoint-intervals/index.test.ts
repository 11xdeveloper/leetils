import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { summaryRanges } from "../0228-summary-ranges";
import { DataStreamAsDisjointIntervals } from ".";

describe("352. Data Stream as Disjoint Intervals", () => {
	it("solves the example from the problem statement", () => {
		const ranges = new DataStreamAsDisjointIntervals();
		const expected = [
			[[1, 1]],
			[
				[1, 1],
				[3, 3],
			],
			[
				[1, 1],
				[3, 3],
				[7, 7],
			],
			[
				[1, 3],
				[7, 7],
			],
			[
				[1, 3],
				[6, 7],
			],
		];
		for (const [i, value] of [1, 3, 7, 2, 6].entries()) {
			ranges.addNum(value);
			expect(ranges.getIntervals()).toEqual(expected[i] ?? []);
		}
	});

	it("matches Summary Ranges after every addition on random streams", () => {
		const random = createRandom(352);
		for (let run = 0; run < 200; run++) {
			const ranges = new DataStreamAsDisjointIntervals();
			const seen = new Set<number>();
			for (let step = 0; step < 30; step++) {
				const value = random.int(0, 25);
				ranges.addNum(value);
				seen.add(value);
				const expected = summaryRanges([...seen].toSorted((a, b) => a - b)).map(
					(range) => {
						const [start = 0, end = start] = range.split("->").map(Number);
						return [start, end];
					},
				);
				expect(ranges.getIntervals()).toEqual(expected);
			}
		}
	});
});

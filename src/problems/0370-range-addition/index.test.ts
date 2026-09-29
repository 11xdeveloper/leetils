import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rangeAddition } from ".";

describe("370. Range Addition", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			rangeAddition(5, [
				[1, 3, 2],
				[2, 4, 3],
				[0, 2, -2],
			]),
		).toEqual([-2, 0, 3, 5, 3]);
		expect(
			rangeAddition(10, [
				[2, 4, 6],
				[5, 6, 8],
				[1, 9, -4],
			]),
		).toEqual([0, -4, 2, 2, 2, 4, 4, -4, -4, -4]);
	});

	it("matches applying every update directly on random inputs", () => {
		const random = createRandom(370);
		for (let run = 0; run < 500; run++) {
			const length = random.int(1, 15);
			const updates = Array.from({ length: random.int(0, 8) }, () => {
				const start = random.int(0, length - 1);
				return [start, random.int(start, length - 1), random.int(-10, 10)];
			});
			const expected = new Array<number>(length).fill(0);
			for (const [start = 0, end = 0, inc = 0] of updates) {
				for (let i = start; i <= end; i++)
					expected[i] = (expected[i] ?? 0) + inc;
			}
			expect(rangeAddition(length, updates)).toEqual(expected);
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { intersectionOfTwoArraysII as intersect } from ".";

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

/** For each distinct value, repeats it the smaller of its two counts. */
const byCounting = (a: number[], b: number[]): number[] =>
	[...new Set(a)].flatMap((x) =>
		new Array<number>(
			Math.min(
				a.filter((y) => y === x).length,
				b.filter((y) => y === x).length,
			),
		).fill(x),
	);

describe("350. Intersection of Two Arrays II", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(intersect([1, 2, 2, 1], [2, 2]))).toEqual([2, 2]);
		expect(sorted(intersect([4, 9, 5], [9, 4, 9, 8, 4]))).toEqual([4, 9]);
	});

	it("matches taking each value's smaller count on random inputs", () => {
		const random = createRandom(350);
		for (let run = 0; run < 1000; run++) {
			const a = random.array(random.int(1, 10), 0, 5);
			const b = random.array(random.int(1, 10), 0, 5);
			expect(sorted(intersect(a, b))).toEqual(sorted(byCounting(a, b)));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { intersectionOfThreeSortedArrays as arraysIntersection } from ".";

describe("1213. Intersection of Three Sorted Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			arraysIntersection([1, 2, 3, 4, 5], [1, 2, 5, 7, 9], [1, 3, 4, 5, 8]),
		).toEqual([1, 5]);
		expect(
			arraysIntersection(
				[197, 418, 523, 876, 1356],
				[501, 880, 1593, 1710, 1870],
				[521, 682, 1337, 1395, 1764],
			),
		).toEqual([]);
	});

	it("matches filtering with includes on random inputs", () => {
		const random = createRandom(1213);
		const sortedSet = () =>
			[...new Set(random.array(random.int(1, 10), 1, 15))].sort(
				(a, b) => a - b,
			);
		for (let run = 0; run < 300; run++) {
			const [a, b, c] = [sortedSet(), sortedSet(), sortedSet()];
			expect(arraysIntersection(a, b, c)).toEqual(
				a.filter((value) => b.includes(value) && c.includes(value)),
			);
		}
	});
});

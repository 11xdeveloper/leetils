import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { intersectionOfTwoArrays as intersection } from ".";

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("349. Intersection of Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(intersection([1, 2, 2, 1], [2, 2]))).toEqual([2]);
		expect(sorted(intersection([4, 9, 5], [9, 4, 9, 8, 4]))).toEqual([4, 9]);
	});

	it("matches filtering distinct values on random inputs", () => {
		const random = createRandom(349);
		for (let run = 0; run < 1000; run++) {
			const a = random.array(random.int(1, 10), 0, 8);
			const b = random.array(random.int(1, 10), 0, 8);
			expect(sorted(intersection(a, b))).toEqual(
				sorted([...new Set(a)].filter((x) => b.includes(x))),
			);
		}
	});
});

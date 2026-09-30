import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findPivotIndex as pivotIndex } from ".";

describe("724. Find Pivot Index", () => {
	it("solves the examples from the problem statement", () => {
		expect(pivotIndex([1, 7, 3, 6, 5, 6])).toBe(3);
		expect(pivotIndex([1, 2, 3])).toBe(-1);
		expect(pivotIndex([2, 1, -1])).toBe(0);
	});

	it("matches summing both sides at every index on random inputs", () => {
		const random = createRandom(724);
		const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 10), -3, 3);
			expect(pivotIndex(nums)).toBe(
				nums.findIndex(
					(_, i) => sum(nums.slice(0, i)) === sum(nums.slice(i + 1)),
				),
			);
		}
	});
});

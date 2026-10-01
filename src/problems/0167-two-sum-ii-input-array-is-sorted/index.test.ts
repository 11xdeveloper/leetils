import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { twoSumIIInputArrayIsSorted as twoSum } from ".";

describe("167. Two Sum II - Input Array Is Sorted", () => {
	it("solves the examples from the problem statement", () => {
		expect(twoSum([2, 7, 11, 15], 9)).toEqual([1, 2]);
		expect(twoSum([2, 3, 4], 6)).toEqual([1, 3]);
		expect(twoSum([-1, 0], -1)).toEqual([1, 2]);
	});

	it("uses two different positions holding equal values", () => {
		expect(twoSum([1, 3, 3, 8], 6)).toEqual([2, 3]);
	});

	it("finds the pair in random sorted arrays", () => {
		const random = createRandom(167);
		for (let run = 0; run < 1000; run++) {
			const numbers = random
				.array(random.int(2, 20), -50, 50)
				.toSorted((a, b) => a - b);
			const i = random.int(0, numbers.length - 2);
			const j = random.int(i + 1, numbers.length - 1);
			const target = (numbers[i] ?? 0) + (numbers[j] ?? 0);
			const [a = 0, b = 0] = twoSum(numbers, target);
			expect(a).toBeLessThan(b);
			expect((numbers[a - 1] ?? 0) + (numbers[b - 1] ?? 0)).toBe(target);
		}
	});
});

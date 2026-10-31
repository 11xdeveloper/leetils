import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arrayUpperBound } from ".";

describe("2774. Array Upper Bound", () => {
	it("solves the examples from the problem statement", () => {
		expect(arrayUpperBound.call([3, 4, 5], 5)).toBe(2);
		expect(arrayUpperBound.call([1, 4, 5], 2)).toBe(-1);
		expect(arrayUpperBound.call([3, 4, 6, 6, 6, 6, 7], 6)).toBe(5);
	});

	it("matches lastIndexOf on random sorted arrays", () => {
		const random = createRandom(2774);
		for (let i = 0; i < 300; i++) {
			const nums = random.array(random.int(0, 12), 0, 6).sort((a, b) => a - b);
			const target = random.int(-1, 7);
			expect(arrayUpperBound.call(nums, target)).toBe(nums.lastIndexOf(target));
		}
	});
});

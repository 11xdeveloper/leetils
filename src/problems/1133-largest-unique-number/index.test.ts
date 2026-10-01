import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestUniqueNumber } from ".";

describe("1133. Largest Unique Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestUniqueNumber([5, 7, 3, 9, 4, 9, 8, 3, 1])).toBe(8);
		expect(largestUniqueNumber([9, 9, 8, 8])).toBe(-1);
	});

	it("matches filtering by indexOf on random inputs", () => {
		const random = createRandom(1133);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), 0, 10);
			const unique = nums.filter(
				(num) => nums.indexOf(num) === nums.lastIndexOf(num),
			);
			expect(largestUniqueNumber(nums)).toBe(Math.max(-1, ...unique));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { binarySearch as search } from ".";

describe("704. Binary Search", () => {
	it("solves the examples from the problem statement", () => {
		expect(search([-1, 0, 3, 5, 9, 12], 9)).toBe(4);
		expect(search([-1, 0, 3, 5, 9, 12], 2)).toBe(-1);
	});

	it("matches indexOf on random sorted arrays", () => {
		const random = createRandom(704);
		for (let run = 0; run < 300; run++) {
			const nums = [...new Set(random.array(random.int(1, 30), -50, 50))].sort(
				(a, b) => a - b,
			);
			for (let target = -51; target <= 51; target++)
				expect(search(nums, target)).toBe(nums.indexOf(target));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { missingNumber } from ".";

describe("268. Missing Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(missingNumber([3, 0, 1])).toBe(2);
		expect(missingNumber([0, 1])).toBe(2);
		expect(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])).toBe(8);
	});

	it("handles 0 missing", () => {
		expect(missingNumber([1])).toBe(0);
	});

	it("finds the missing number in random shuffled ranges", () => {
		const random = createRandom(268);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 50);
			const missing = random.int(0, n);
			const nums = Array.from({ length: n + 1 }, (_, i) => i)
				.filter((x) => x !== missing)
				.toSorted(() => random.next() - 0.5);
			expect(missingNumber(nums)).toBe(missing);
		}
	});
});

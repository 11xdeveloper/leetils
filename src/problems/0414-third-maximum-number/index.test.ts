import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { thirdMaximumNumber } from ".";

describe("414. Third Maximum Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(thirdMaximumNumber([3, 2, 1])).toBe(1);
		expect(thirdMaximumNumber([1, 2])).toBe(2);
		expect(thirdMaximumNumber([2, 2, 3, 1])).toBe(1);
	});

	it("handles the smallest 32-bit integer as a real value", () => {
		expect(thirdMaximumNumber([1, 2, -(2 ** 31)])).toBe(-(2 ** 31));
	});

	it("matches sorting the distinct values on random inputs", () => {
		const random = createRandom(414);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 10), -5, 5);
			const distinct = [...new Set(nums)].toSorted((a, b) => b - a);
			expect(thirdMaximumNumber(nums)).toBe(distinct[2] ?? distinct[0] ?? 0);
		}
	});
});

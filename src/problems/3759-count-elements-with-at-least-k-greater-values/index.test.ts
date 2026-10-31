import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countElementsWithAtLeastKGreaterValues as countElements } from ".";

describe("3759. Count Elements With at Least K Greater Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(countElements([3, 1, 2], 1)).toBe(2);
		expect(countElements([5, 5, 5], 2)).toBe(0);
	});

	it("matches counting directly on random arrays", () => {
		const random = createRandom(3759);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 6);
			const k = random.int(0, nums.length);
			const expected = nums.filter(
				(x) => nums.filter((y) => y > x).length >= k,
			).length;
			expect(countElements(nums, k)).toBe(expected);
		}
	});
});

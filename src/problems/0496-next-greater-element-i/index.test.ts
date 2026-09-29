import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nextGreaterElementI as nextGreaterElement } from ".";

describe("496. Next Greater Element I", () => {
	it("solves the examples from the problem statement", () => {
		expect(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])).toEqual([-1, 3, -1]);
		expect(nextGreaterElement([2, 4], [1, 2, 3, 4])).toEqual([3, -1]);
	});

	it("matches scanning to the right on random inputs", () => {
		const random = createRandom(496);
		for (let run = 0; run < 1000; run++) {
			const nums2 = [...new Set(random.array(random.int(1, 12), 0, 20))];
			const nums1 = nums2.filter(() => random.int(0, 1) === 1);
			const expected = nums1.map(
				(num) =>
					nums2.slice(nums2.indexOf(num) + 1).find((other) => other > num) ??
					-1,
			);
			expect(nextGreaterElement(nums1, nums2)).toEqual(expected);
		}
	});
});

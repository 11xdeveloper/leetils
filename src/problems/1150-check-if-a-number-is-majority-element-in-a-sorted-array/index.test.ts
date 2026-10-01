import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfANumberIsMajorityElementInASortedArray as isMajorityElement } from ".";

describe("1150. Check If a Number Is Majority Element in a Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(isMajorityElement([2, 4, 5, 5, 5, 5, 5, 6, 6], 5)).toBeTrue();
		expect(isMajorityElement([10, 100, 101, 101], 101)).toBeFalse();
	});

	it("matches counting on random inputs", () => {
		const random = createRandom(1150);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 1, 3).sort((a, b) => a - b);
			const target = random.int(1, 4);
			const count = nums.filter((num) => num === target).length;
			expect(isMajorityElement(nums, target)).toBe(count > nums.length / 2);
		}
	});
});

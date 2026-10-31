import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubarraysWithMajorityElementI } from "../3737-count-subarrays-with-majority-element-i";
import { countSubarraysWithMajorityElementII as countMajoritySubarrays } from ".";

describe("3739. Count Subarrays With Majority Element II", () => {
	it("solves the examples from the problem statement", () => {
		expect(countMajoritySubarrays([1, 2, 2, 3], 2)).toBe(5);
		expect(countMajoritySubarrays([1, 1, 1, 1], 1)).toBe(10);
		expect(countMajoritySubarrays([1, 2, 3], 4)).toBe(0);
	});

	it("matches part I on random arrays", () => {
		const random = createRandom(3739);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), 1, 3);
			expect(countMajoritySubarrays(nums, 1)).toBe(
				countSubarraysWithMajorityElementI(nums, 1),
			);
		}
	});
});

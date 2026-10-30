import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfIncremovableSubarraysI } from "../2970-count-the-number-of-incremovable-subarrays-i";
import { countTheNumberOfIncremovableSubarraysII as incremovableSubarrayCount } from ".";

describe("2972. Count the Number of Incremovable Subarrays II", () => {
	it("solves the examples from the problem statement", () => {
		expect(incremovableSubarrayCount([1, 2, 3, 4])).toBe(10);
		expect(incremovableSubarrayCount([6, 5, 7, 8])).toBe(7);
		expect(incremovableSubarrayCount([8, 7, 6, 6])).toBe(3);
	});

	it("matches trying every removal on random inputs", () => {
		const random = createRandom(2972);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 8);
			expect(incremovableSubarrayCount(nums)).toBe(
				countTheNumberOfIncremovableSubarraysI(nums),
			);
		}
	});
});

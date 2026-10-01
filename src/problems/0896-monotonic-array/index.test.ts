import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { monotonicArray as isMonotonic } from ".";

describe("896. Monotonic Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(isMonotonic([1, 2, 2, 3])).toBeTrue();
		expect(isMonotonic([6, 5, 4, 4])).toBeTrue();
		expect(isMonotonic([1, 3, 2])).toBeFalse();
	});

	it("matches comparing with sorted copies on random inputs", () => {
		const random = createRandom(896);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 6), 0, 3);
			const ascending = nums.toSorted((a, b) => a - b).join();
			const descending = nums.toSorted((a, b) => b - a).join();
			expect(isMonotonic(nums)).toBe(
				nums.join() === ascending || nums.join() === descending,
			);
		}
	});
});

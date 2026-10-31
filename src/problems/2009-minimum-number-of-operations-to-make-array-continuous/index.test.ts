import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfOperationsToMakeArrayContinuous as minOpsContinuous } from ".";

/** Tries every range that starts at one of the values. */
const byBruteForce = (nums: number[]): number =>
	Math.min(
		...nums.map(
			(low) =>
				nums.length -
				new Set(nums.filter((v) => v >= low && v < low + nums.length)).size,
		),
	);

describe("2009. Minimum Number of Operations to Make Array Continuous", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOpsContinuous([4, 2, 5, 3])).toBe(0);
		expect(minOpsContinuous([1, 2, 3, 5, 6])).toBe(1);
		expect(minOpsContinuous([1, 10, 100, 1000])).toBe(3);
	});

	it("matches trying every range on random inputs", () => {
		const random = createRandom(2009);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 15);
			expect(minOpsContinuous(nums)).toBe(byBruteForce(nums));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subarraysDistinctElementSumOfSquaresI } from "../2913-subarrays-distinct-element-sum-of-squares-i";
import { subarraysDistinctElementSumOfSquaresII as sumCounts } from ".";

describe("2916. Subarrays Distinct Element Sum of Squares II", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumCounts([1, 2, 1])).toBe(15);
		expect(sumCounts([2, 2])).toBe(3);
	});

	it("matches the quadratic version on random inputs", () => {
		const random = createRandom(2916);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 20), 1, 5);
			expect(sumCounts(nums)).toBe(subarraysDistinctElementSumOfSquaresI(nums));
		}
	});
});

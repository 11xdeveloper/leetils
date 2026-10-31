import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestBalancedSubarrayI } from "../3719-longest-balanced-subarray-i";
import { longestBalancedSubarrayII as longestBalanced } from ".";

describe("3721. Longest Balanced Subarray II", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestBalanced([2, 5, 4, 3])).toBe(4);
		expect(longestBalanced([3, 2, 2, 5, 4])).toBe(5);
		expect(longestBalanced([1, 2, 3, 2])).toBe(3);
	});

	it("matches part I on random arrays", () => {
		const random = createRandom(3721);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 20), 1, 8);
			expect(longestBalanced(nums)).toBe(longestBalancedSubarrayI(nums));
		}
	});
});

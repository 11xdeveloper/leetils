import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubarraysWithEvenOddRatioI } from "../4011-count-subarrays-with-even-odd-ratio-i";
import { countSubarraysWithEvenOddRatioII as countRatioSubarrays } from ".";

describe("4013. Count Subarrays With Even Odd Ratio II", () => {
	it("solves the examples from the problem statement", () => {
		expect(countRatioSubarrays([1, 2, 1, 2], 3, 2)).toBe(7);
		expect(countRatioSubarrays([2, 2, 1], 2, 1)).toBe(3);
		expect(countRatioSubarrays([2, 2, 2], 1, 1)).toBe(0);
	});

	it("matches part I on random arrays", () => {
		const random = createRandom(4013);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), 1, 9);
			const [a, b] = [random.int(1, 5), random.int(1, 5)];
			expect(countRatioSubarrays(nums, a, b)).toBe(
				countSubarraysWithEvenOddRatioI(nums, a, b),
			);
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSubsequencesWithOddSum as subsequenceCount } from ".";

describe("3247. Number of Subsequences with Odd Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(subsequenceCount([1, 1, 1])).toBe(4);
		expect(subsequenceCount([1, 2, 2])).toBe(4);
	});

	it("matches counting every subsequence", () => {
		const random = createRandom(3247);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 10), 1, 6);
			let count = 0;
			for (let mask = 1; mask < 1 << nums.length; mask++)
				if (
					nums.reduce((s, v, i) => ((mask >> i) & 1 ? s + v : s), 0) % 2 ===
					1
				)
					count++;
			expect(subsequenceCount(nums)).toBe(count);
		}
	});
});

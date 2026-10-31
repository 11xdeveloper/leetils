import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subsequencesWithAUniqueMiddleModeI } from "../3395-subsequences-with-a-unique-middle-mode-i";
import { subsequencesWithAUniqueMiddleModeII as subsequencesWithMiddleMode } from ".";

describe("3416. Subsequences with a Unique Middle Mode II", () => {
	it("solves the examples from the problem statement", () => {
		expect(subsequencesWithMiddleMode([1, 1, 1, 1, 1, 1])).toBe(6);
		expect(subsequencesWithMiddleMode([1, 2, 2, 3, 3, 4])).toBe(4);
		expect(subsequencesWithMiddleMode([0, 1, 2, 3, 4, 5, 6, 7, 8])).toBe(0);
	});

	it("matches the per-value version on random arrays", () => {
		const random = createRandom(3416);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(5, 40), 0, random.int(1, 6));
			expect(subsequencesWithMiddleMode(nums)).toBe(
				subsequencesWithAUniqueMiddleModeI(nums),
			);
		}
	});

	it("handles 10^5 elements", () => {
		const nums = Array.from({ length: 100000 }, (_, i) => i % 1000);
		const result = subsequencesWithMiddleMode(nums);
		expect(result).toBeGreaterThanOrEqual(0);
		expect(result).toBeLessThan(1_000_000_007);
	});
});

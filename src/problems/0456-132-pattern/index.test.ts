import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { oneThreeTwoPattern as find132pattern } from ".";

const byBruteForce = (nums: number[]): boolean =>
	nums.some((a, i) =>
		nums.some((b, j) => j > i && nums.some((c, k) => k > j && a < c && c < b)),
	);

describe("456. 132 Pattern", () => {
	it("solves the examples from the problem statement", () => {
		expect(find132pattern([1, 2, 3, 4])).toBeFalse();
		expect(find132pattern([3, 1, 4, 2])).toBeTrue();
		expect(find132pattern([-1, 3, 2, 0])).toBeTrue();
	});

	it("matches checking every triple on random inputs", () => {
		const random = createRandom(456);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 10), -5, 5);
			expect(find132pattern(nums)).toBe(byBruteForce(nums));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { burstBalloons } from ".";

/** Tries every order of bursting. */
const byBruteForce = (nums: number[]): number => {
	if (nums.length === 0) return 0;
	return Math.max(
		...nums.map(
			(num, i) =>
				(nums[i - 1] ?? 1) * num * (nums[i + 1] ?? 1) +
				byBruteForce(nums.toSpliced(i, 1)),
		),
	);
};

describe("312. Burst Balloons", () => {
	it("solves the examples from the problem statement", () => {
		expect(burstBalloons([3, 1, 5, 8])).toBe(167);
		expect(burstBalloons([1, 5])).toBe(10);
	});

	it("handles zeros and a single balloon", () => {
		expect(burstBalloons([7])).toBe(7);
		expect(burstBalloons([0, 0])).toBe(0);
	});

	it("matches trying every order on random inputs", () => {
		const random = createRandom(312);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 6), 0, 9);
			expect(burstBalloons(nums)).toBe(byBruteForce(nums));
		}
	});
});

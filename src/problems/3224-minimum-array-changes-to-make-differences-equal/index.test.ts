import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumArrayChangesToMakeDifferencesEqual as minChanges } from ".";

/** Tries every difference, pricing each pair directly. */
const byBruteForce = (nums: number[], k: number): number => {
	const n = nums.length;
	let best = Number.POSITIVE_INFINITY;
	for (let x = 0; x <= k; x++) {
		let total = 0;
		for (let i = 0; i < n / 2; i++) {
			const [a = 0, b = 0] = [nums[i], nums[n - 1 - i]];
			if (Math.abs(a - b) === x) continue;
			let one = false;
			for (let v = 0; v <= k; v++)
				if (Math.abs(v - b) === x || Math.abs(a - v) === x) one = true;
			total += one ? 1 : 2;
		}
		best = Math.min(best, total);
	}
	return best;
};

describe("3224. Minimum Array Changes to Make Differences Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minChanges([1, 0, 1, 2, 4, 3], 4)).toBe(2);
		expect(minChanges([0, 1, 2, 3, 3, 6, 5, 4], 6)).toBe(2);
	});

	it("matches pricing every difference on random arrays", () => {
		const random = createRandom(3224);
		for (let run = 0; run < 300; run++) {
			const k = random.int(0, 8);
			const nums = random.array(2 * random.int(1, 5), 0, k);
			expect(minChanges(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});

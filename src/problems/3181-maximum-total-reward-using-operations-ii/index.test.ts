import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumTotalRewardUsingOperationsII as maxTotalReward } from ".";

/** Tries every subset, picked in increasing order. */
const byBruteForce = (rewardValues: number[]): number => {
	const sorted = rewardValues.toSorted((a, b) => a - b);
	let best = 0;
	for (let mask = 0; mask < 1 << sorted.length; mask++) {
		let reward = 0;
		let valid = true;
		sorted.forEach((v, i) => {
			if (!((mask >> i) & 1)) return;
			if (v <= reward) valid = false;
			reward += v;
		});
		if (valid) best = Math.max(best, reward);
	}
	return best;
};

describe("3181. Maximum Total Reward Using Operations II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTotalReward([1, 1, 3, 3])).toBe(4);
		expect(maxTotalReward([1, 6, 4, 3, 2])).toBe(11);
	});

	it("matches trying every subset on random values", () => {
		const random = createRandom(3181);
		for (let run = 0; run < 300; run++) {
			const values = random.array(random.int(1, 10), 1, random.int(1, 100));
			expect(maxTotalReward(values)).toBe(byBruteForce(values));
		}
	});

	it("handles large values quickly", () => {
		const values = Array.from({ length: 50000 }, (_, i) => i + 1);
		expect(maxTotalReward(values)).toBe(99999);
	});
});

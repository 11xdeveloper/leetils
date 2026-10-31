import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfIncreasingSubsequenceToBeRemoved as minOperations } from ".";

/** Greedily deals each element onto the first subsequence it fits (optimal). */
const byGreedy = (nums: number[]): number => {
	const lasts: number[] = [];
	for (const num of nums) {
		let best = -1;
		lasts.forEach((last, i) => {
			if (last < num && (best === -1 || last > (lasts[best] ?? 0))) best = i;
		});
		if (best === -1) lasts.push(num);
		else lasts[best] = num;
	}
	return lasts.length;
};

describe("3231. Minimum Number of Increasing Subsequence to Be Removed", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([5, 3, 1, 4, 2])).toBe(3);
		expect(minOperations([1, 2, 3, 4, 5])).toBe(1);
		expect(minOperations([5, 4, 3, 2, 1])).toBe(5);
	});

	it("matches greedy dealing on random arrays", () => {
		const random = createRandom(3231);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 6);
			expect(minOperations(nums)).toBe(byGreedy(nums));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { jumpGame } from ".";

/** Marks every reachable index, one index at a time. */
const bySearch = (nums: number[]): boolean => {
	const reachable = nums.map((_, i) => i === 0);
	for (const [i, jump] of nums.entries()) {
		if (!reachable[i]) continue;
		for (let j = i + 1; j <= i + jump && j < nums.length; j++)
			reachable[j] = true;
	}
	return reachable.at(-1) ?? false;
};

describe("55. Jump Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(jumpGame([2, 3, 1, 1, 4])).toBeTrue();
		expect(jumpGame([3, 2, 1, 0, 4])).toBeFalse();
	});

	it("is already at the end with one element", () => {
		expect(jumpGame([0])).toBeTrue();
	});

	it("can't move from a leading 0", () => {
		expect(jumpGame([0, 1])).toBeFalse();
	});

	it("matches marking every reachable index on random inputs", () => {
		const random = createRandom(55);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 20), 0, 3);
			expect(jumpGame(nums)).toBe(bySearch(nums));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { guessTheMajorityInAHiddenArray as guessMajority } from ".";

const reader = (nums: number[]) => {
	const api = {
		calls: 0,
		query: (a: number, b: number, c: number, d: number) => {
			api.calls++;
			const ones = [a, b, c, d].reduce((sum, i) => sum + (nums[i] ?? 0), 0);
			return ones === 0 || ones === 4 ? 4 : ones === 2 ? 0 : 2;
		},
		length: () => nums.length,
	};
	return api;
};

const expectMajority = (nums: number[]) => {
	const api = reader(nums);
	const result = guessMajority(api);
	const ones = nums.filter((x) => x === 1).length;
	if (2 * ones === nums.length) expect(result).toBe(-1);
	else expect(nums[result]).toBe(2 * ones > nums.length ? 1 : 0);
	expect(api.calls).toBeLessThanOrEqual(2 * nums.length);
};

describe("1538. Guess the Majority in a Hidden Array", () => {
	it("solves the examples from the problem statement", () => {
		expectMajority([0, 0, 1, 0, 1, 1, 1, 1]);
		expectMajority([0, 0, 1, 1, 0]);
		expectMajority([1, 0, 1, 0, 1, 0, 1, 0]);
	});

	it("finds the majority in random arrays", () => {
		const random = createRandom(1538);
		for (let run = 0; run < 500; run++)
			expectMajority(random.array(random.int(5, 20), 0, 1));
	});
});

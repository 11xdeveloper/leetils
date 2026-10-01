import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfSpecialEvenlySpacedElementsInArray as solve } from ".";

describe("1714. Sum Of Special Evenly-Spaced Elements In Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			solve(
				[0, 1, 2, 3, 4, 5, 6, 7],
				[
					[0, 3],
					[5, 1],
					[4, 2],
				],
			),
		).toEqual([9, 18, 10]);
		expect(solve([100, 200, 101, 201, 102, 202, 103, 203], [[0, 7]])).toEqual([
			303,
		]);
	});

	it("matches summing directly on random inputs", () => {
		const random = createRandom(1714);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 40), 0, 10 ** 9);
			const queries = Array.from({ length: 20 }, () => [
				random.int(0, nums.length - 1),
				random.int(1, 50),
			]);
			const expected = queries.map(([x = 0, y = 1]) => {
				let sum = 0;
				for (let j = x; j < nums.length; j += y) sum += nums[j] ?? 0;
				return sum % 1_000_000_007;
			});
			expect(solve(nums, queries)).toEqual(expected);
		}
	});
});

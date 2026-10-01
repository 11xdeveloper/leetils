import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { deleteAndEarn } from ".";

/** Tries taking each remaining number, recursively. */
const byBruteForce = (nums: number[]): number => {
	if (nums.length === 0) return 0;
	return Math.max(
		...[...new Set(nums)].map((x) => {
			const rest = [...nums];
			rest.splice(rest.indexOf(x), 1);
			return (
				x + byBruteForce(rest.filter((num) => num !== x - 1 && num !== x + 1))
			);
		}),
	);
};

describe("740. Delete and Earn", () => {
	it("solves the examples from the problem statement", () => {
		expect(deleteAndEarn([3, 4, 2])).toBe(6);
		expect(deleteAndEarn([2, 2, 3, 3, 3, 4])).toBe(9);
	});

	it("matches trying every sequence of moves on random inputs", () => {
		const random = createRandom(740);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 7), 1, 6);
			expect(deleteAndEarn(nums)).toBe(byBruteForce(nums));
		}
	});
});

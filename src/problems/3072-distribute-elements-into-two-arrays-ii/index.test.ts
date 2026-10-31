import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { distributeElementsIntoTwoArraysII as resultArray } from ".";

/** Simulates by counting with filter. */
const byBruteForce = (nums: number[]): number[] => {
	const a = [nums[0] ?? 0];
	const b = [nums[1] ?? 0];
	for (const num of nums.slice(2)) {
		const ga = a.filter((x) => x > num).length;
		const gb = b.filter((x) => x > num).length;
		if (ga > gb || (ga === gb && a.length <= b.length)) a.push(num);
		else b.push(num);
	}
	return [...a, ...b];
};

describe("3072. Distribute Elements Into Two Arrays II", () => {
	it("solves the examples from the problem statement", () => {
		expect(resultArray([2, 1, 3, 3])).toEqual([2, 3, 1, 3]);
		expect(resultArray([5, 14, 3, 1, 2])).toEqual([5, 3, 1, 2, 14]);
		expect(resultArray([3, 3, 3, 3])).toEqual([3, 3, 3, 3]);
	});

	it("matches a direct simulation on random arrays", () => {
		const random = createRandom(3072);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(3, 15), 1, 8);
			expect(resultArray(nums)).toEqual(byBruteForce(nums));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { gcdSortOfAnArray as gcdSort } from ".";

/** Groups indices that can swap (through shared factors) and checks each group sorts into place. */
const byBruteForce = (nums: number[]): boolean => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const group = nums.map((_, i) => i);
	const find = (x: number): number =>
		group[x] === x ? x : find(group[x] ?? x);
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			if (gcd(nums[i] ?? 1, nums[j] ?? 1) > 1) group[find(i)] = find(j);
	const sorted = nums.toSorted((a, b) => a - b);
	const groups = new Map<number, number[]>();
	for (const [i] of nums.entries())
		groups.set(find(i), [...(groups.get(find(i)) ?? []), i]);
	return [...groups.values()].every((indices) => {
		const values = indices.map((i) => nums[i] ?? 0).sort((a, b) => a - b);
		return indices.every((i, k) => values[k] === sorted[i]);
	});
};

describe("1998. GCD Sort of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(gcdSort([7, 21, 3])).toBeTrue();
		expect(gcdSort([5, 2, 6, 2])).toBeFalse();
		expect(gcdSort([10, 5, 9, 3, 15])).toBeTrue();
	});

	it("matches grouping swappable elements on random inputs", () => {
		const random = createRandom(1998);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 10), 2, 40);
			expect(gcdSort(nums)).toBe(byBruteForce(nums));
		}
	});
});

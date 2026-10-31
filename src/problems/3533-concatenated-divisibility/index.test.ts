import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { concatenatedDivisibility } from ".";

/** Tries permutations in lexicographic order. */
const byBruteForce = (nums: number[], k: number): number[] => {
	const sorted = nums.toSorted((a, b) => a - b);
	let found: number[] = [];
	const permute = (prefix: number[], used: number): boolean => {
		if (prefix.length === sorted.length) {
			if (BigInt(prefix.join("")) % BigInt(k) === 0n) {
				found = prefix;
				return true;
			}
			return false;
		}
		for (let i = 0; i < sorted.length; i++)
			if (
				!((used >> i) & 1) &&
				permute([...prefix, sorted[i] ?? 0], used | (1 << i))
			)
				return true;
		return false;
	};
	permute([], 0);
	return found;
};

describe("3533. Concatenated Divisibility", () => {
	it("solves the examples from the problem statement", () => {
		expect(concatenatedDivisibility([3, 12, 45], 5)).toEqual([3, 12, 45]);
		expect(concatenatedDivisibility([10, 5], 10)).toEqual([5, 10]);
		expect(concatenatedDivisibility([1, 2, 3], 5)).toEqual([]);
	});

	it("matches trying permutations on random arrays", () => {
		const random = createRandom(3533);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 6), 1, 120);
			const k = random.int(1, 30);
			expect(concatenatedDivisibility(nums, k)).toEqual(byBruteForce(nums, k));
		}
	});
});

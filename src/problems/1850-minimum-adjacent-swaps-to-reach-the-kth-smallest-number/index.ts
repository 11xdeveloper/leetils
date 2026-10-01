import { nextPermutation } from "../0031-next-permutation";

/**
 * 1850. Minimum Adjacent Swaps to Reach the Kth Smallest Number
 *
 * Returns the fewest adjacent swaps turning the digit string `num` into
 * its `k`-th next larger permutation.
 *
 * Step the next permutation `k` times. Then transform greedily: for each
 * position, bring the nearest matching digit leftward one swap at a time.
 *
 * @see https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number/
 * @difficulty Medium
 * @timeComplexity O(n · (n + k))
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAdjacentSwapsToReachTheKthSmallestNumber("5489355142", 4); // 2
 */
export const minimumAdjacentSwapsToReachTheKthSmallestNumber = (
	num: string,
	k: number,
): number => {
	const target = Array.from(num, Number);
	for (let step = 0; step < k; step++) nextPermutation(target);
	const current = Array.from(num, Number);
	let swaps = 0;
	for (let i = 0; i < current.length; i++) {
		let j = i;
		while (current[j] !== target[i]) j++;
		for (; j > i; j--) {
			[current[j], current[j - 1]] = [current[j - 1] ?? 0, current[j] ?? 0];
			swaps++;
		}
	}
	return swaps;
};

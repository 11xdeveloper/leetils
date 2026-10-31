/**
 * 3718. Smallest Missing Multiple of K
 *
 * The smallest positive multiple of `k` not in `nums`.
 *
 * @see https://leetcode.com/problems/smallest-missing-multiple-of-k/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestMissingMultipleOfK([8, 2, 3, 4, 6], 2); // 10
 */
export const smallestMissingMultipleOfK = (
	nums: readonly number[],
	k: number,
): number => {
	const present = new Set(nums);
	let x = k;
	while (present.has(x)) x += k;
	return x;
};

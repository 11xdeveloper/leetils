/**
 * 2964. Number of Divisible Triplet Sums
 *
 * Returns how many index triplets `i < j < k` have a sum divisible by
 * `d`.
 *
 * Fix `k` and `j`; count earlier elements with the remainder that
 * completes the sum, kept in a map that grows as `j` advances.
 *
 * @see https://leetcode.com/problems/number-of-divisible-triplet-sums/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfDivisibleTripletSums([3, 3, 4, 7, 8], 5); // 3
 */
export const numberOfDivisibleTripletSums = (
	nums: readonly number[],
	d: number,
): number => {
	const seen = new Map<number, number>();
	let triplets = 0;
	for (let j = 0; j < nums.length; j++) {
		for (let k = j + 1; k < nums.length; k++) {
			const needed = (((-(nums[j] ?? 0) - (nums[k] ?? 0)) % d) + d) % d;
			triplets += seen.get(needed) ?? 0;
		}
		const remainder = (nums[j] ?? 0) % d;
		seen.set(remainder, (seen.get(remainder) ?? 0) + 1);
	}
	return triplets;
};

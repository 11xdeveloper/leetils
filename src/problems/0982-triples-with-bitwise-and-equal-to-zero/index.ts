/**
 * 982. Triples with Bitwise AND Equal To Zero
 *
 * Counts the index triples `(i, j, k)` (in any order, repeats allowed) with
 * `nums[i] & nums[j] & nums[k] === 0`. Values are below 2^16.
 *
 * Counts every pairwise AND first (at most 2^16 distinct values), then
 * pairs each pairwise result with each number whose AND with it is 0.
 *
 * @see https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero/
 * @difficulty Hard
 * @timeComplexity O(n^2 + n · 2^16)
 * @spaceComplexity O(2^16)
 *
 * @example
 * triplesWithBitwiseAndEqualToZero([2, 1, 3]); // 12
 */
export const triplesWithBitwiseAndEqualToZero = (
	nums: readonly number[],
): number => {
	const pairs = new Map<number, number>();
	for (const a of nums)
		for (const b of nums) pairs.set(a & b, (pairs.get(a & b) ?? 0) + 1);
	let count = 0;
	for (const c of nums)
		for (const [and, ways] of pairs) if ((and & c) === 0) count += ways;
	return count;
};

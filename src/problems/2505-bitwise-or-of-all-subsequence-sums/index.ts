/**
 * 2505. Bitwise OR of All Subsequence Sums
 *
 * Returns the bitwise OR of the sums of every subsequence of `nums`.
 *
 * Count the set bits of each position across all numbers, then carry half
 * of each count upward as in binary addition: a bit position appears in
 * some subsequence sum exactly when its carried count is nonzero.
 *
 * @see https://leetcode.com/problems/bitwise-or-of-all-subsequence-sums/
 * @difficulty Medium
 * @timeComplexity O(n log m), where `m` is the largest number
 * @spaceComplexity O(log(n · m))
 *
 * @example
 * bitwiseOrOfAllSubsequenceSums([2, 1, 0, 3]); // 7
 */
export const bitwiseOrOfAllSubsequenceSums = (
	nums: readonly number[],
): number => {
	const counts = Array.from({ length: 64 }, () => 0);
	for (const num of nums)
		for (let bit = 0; bit < 31; bit++)
			if ((num >> bit) & 1) counts[bit] = (counts[bit] ?? 0) + 1;

	let answer = 0;
	for (let bit = 0; bit < 63; bit++) {
		const count = counts[bit] ?? 0;
		if (count > 0) answer += 2 ** bit;
		counts[bit + 1] = (counts[bit + 1] ?? 0) + Math.floor(count / 2);
	}
	return answer;
};

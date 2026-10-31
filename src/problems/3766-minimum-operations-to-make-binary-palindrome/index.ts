/**
 * 3766. Minimum Operations to Make Binary Palindrome
 *
 * For each element, the fewest increments or decrements that make its
 * binary form (without leading zeros) a palindrome.
 *
 * List the binary palindromes up to past the largest element, then take
 * the nearest on either side.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-binary-palindrome/
 * @difficulty Medium
 * @timeComplexity O(V log V + n log V)
 * @spaceComplexity O(√V)
 *
 * @example
 * minimumOperationsToMakeBinaryPalindrome([6, 7, 12]); // [1, 0, 3]
 */
export const minimumOperationsToMakeBinaryPalindrome = (
	nums: readonly number[],
): number[] => {
	const limit = 2 * Math.max(...nums) + 2;
	const palindromes: number[] = [];
	for (let x = 1; x <= limit; x++) {
		const bits = x.toString(2);
		if (bits === [...bits].reverse().join("")) palindromes.push(x);
	}
	return nums.map((num) => {
		let [lo, hi] = [0, palindromes.length - 1];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((palindromes[mid] ?? 0) < num) lo = mid + 1;
			else hi = mid;
		}
		const above = (palindromes[lo] ?? 0) - num;
		const below =
			lo > 0 ? num - (palindromes[lo - 1] ?? 0) : Number.POSITIVE_INFINITY;
		return Math.min(above, below);
	});
};

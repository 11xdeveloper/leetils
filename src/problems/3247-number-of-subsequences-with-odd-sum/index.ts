const MOD = 1_000_000_007;

/**
 * 3247. Number of Subsequences with Odd Sum
 *
 * How many subsequences of `nums` have an odd sum, modulo 10⁹ + 7.
 *
 * With any odd element, pairing subsequences by whether they include it
 * splits all 2ⁿ evenly, so 2ⁿ⁻¹ are odd; with none, nothing is.
 *
 * @see https://leetcode.com/problems/number-of-subsequences-with-odd-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSubsequencesWithOddSum([1, 1, 1]); // 4
 */
export const numberOfSubsequencesWithOddSum = (
	nums: readonly number[],
): number => {
	if (!nums.some((num) => num % 2 === 1)) return 0;
	let result = 1;
	for (let i = 1; i < nums.length; i++) result = (result * 2) % MOD;
	return result;
};

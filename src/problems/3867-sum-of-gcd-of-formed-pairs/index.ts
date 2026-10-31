/**
 * 3867. Sum of GCD of Formed Pairs
 *
 * Take gcd(`nums[i]`, max of `nums[0..i]`) for each i, sort them, pair the
 * smallest with the largest repeatedly (ignoring a middle one), and add
 * up each pair's gcd.
 *
 * @see https://leetcode.com/problems/sum-of-gcd-of-formed-pairs/
 * @difficulty Medium
 * @timeComplexity O(n log V + n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfGcdOfFormedPairs([3, 6, 2, 8]); // 5
 */
export const sumOfGcdOfFormedPairs = (nums: readonly number[]): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	let most = 0;
	const values = nums
		.map((num) => {
			most = Math.max(most, num);
			return gcd(num, most);
		})
		.sort((a, b) => a - b);
	let sum = 0;
	for (let i = 0, j = values.length - 1; i < j; i++, j--)
		sum += gcd(values[i] ?? 0, values[j] ?? 0);
	return sum;
};

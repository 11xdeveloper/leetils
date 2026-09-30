/**
 * 1390. Four Divisors
 *
 * Returns the total of the divisors of those `nums` that have exactly four
 * divisors.
 *
 * Finds each number's divisors by trial division up to its square root,
 * giving up once there are more than four.
 *
 * @see https://leetcode.com/problems/four-divisors/
 * @difficulty Medium
 * @timeComplexity O(n √max)
 * @spaceComplexity O(1)
 *
 * @example
 * fourDivisors([21, 4, 7]); // 32
 */
export const fourDivisors = (nums: readonly number[]): number => {
	let total = 0;
	for (const num of nums) {
		const divisors: number[] = [];
		for (let d = 1; d * d <= num && divisors.length <= 4; d++) {
			if (num % d !== 0) continue;
			divisors.push(d);
			if (d * d !== num) divisors.push(num / d);
		}
		if (divisors.length === 4) total += divisors.reduce((sum, d) => sum + d, 0);
	}
	return total;
};

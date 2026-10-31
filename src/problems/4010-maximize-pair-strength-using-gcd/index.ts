/**
 * 4010. Maximize Pair Strength Using GCD
 *
 * The largest (a · b) / gcd(a, b)² over pairs of elements, i.e. the
 * product of the two numbers with their common factor taken out of each.
 *
 * @see https://leetcode.com/problems/maximize-pair-strength-using-gcd/
 * @difficulty Easy
 * @timeComplexity O(n² log V)
 * @spaceComplexity O(1)
 *
 * @example
 * maximizePairStrengthUsingGcd([4, 6, 8]); // 12
 */
export const maximizePairStrengthUsingGcd = (
	nums: readonly number[],
): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	let best = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++) {
			const [a = 0, b = 0] = [nums[i], nums[j]];
			const g = gcd(a, b);
			best = Math.max(best, (a / g) * (b / g));
		}
	return best;
};

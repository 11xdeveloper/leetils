/**
 * 2048. Next Greater Numerically Balanced Number
 *
 * A number is numerically balanced when each digit `d` in it occurs
 * exactly `d` times. Returns the smallest such number greater than `n`
 * (at most 10^6).
 *
 * The answer is at most 1224444, so check the numbers after `n` in turn.
 *
 * @see https://leetcode.com/problems/next-greater-numerically-balanced-number/
 * @difficulty Medium
 * @timeComplexity O(A log A) for the answer A
 * @spaceComplexity O(1)
 *
 * @example
 * nextGreaterNumericallyBalancedNumber(1000); // 1333
 */
export const nextGreaterNumericallyBalancedNumber = (n: number): number => {
	const isBalanced = (number: number): boolean => {
		const counts = new Array<number>(10).fill(0);
		for (let rest = number; rest > 0; rest = Math.floor(rest / 10))
			counts[rest % 10] = (counts[rest % 10] ?? 0) + 1;
		return counts.every((count, digit) => count === 0 || count === digit);
	};
	let candidate = n + 1;
	while (!isBalanced(candidate)) candidate++;
	return candidate;
};

/**
 * 1414. Find the Minimum Number of Fibonacci Numbers Whose Sum Is K
 *
 * Returns the fewest Fibonacci numbers (repeats allowed) adding up to `k`.
 *
 * Greedy: repeatedly subtract the largest Fibonacci number that fits. That
 * is optimal because some optimal sum never uses two neighbouring or two
 * equal Fibonacci numbers, and such sums (Zeckendorf's) always include the
 * largest one that fits.
 *
 * @see https://leetcode.com/problems/find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k/
 * @difficulty Medium
 * @timeComplexity O(log k)
 * @spaceComplexity O(log k)
 *
 * @example
 * findTheMinimumNumberOfFibonacciNumbersWhoseSumIsK(19); // 3
 */
export const findTheMinimumNumberOfFibonacciNumbersWhoseSumIsK = (
	k: number,
): number => {
	const fibonacci = [1, 1];
	while ((fibonacci.at(-1) ?? 0) <= k) {
		fibonacci.push((fibonacci.at(-1) ?? 0) + (fibonacci.at(-2) ?? 0));
	}
	let [left, count] = [k, 0];
	for (let i = fibonacci.length - 1; left > 0; i--) {
		const f = fibonacci[i] ?? 0;
		if (f <= left) {
			left -= f;
			count++;
		}
	}
	return count;
};

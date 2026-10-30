/**
 * 2513. Minimize the Maximum of Two Arrays
 *
 * Fill one array with `uniqueCnt1` distinct positive integers not
 * divisible by `divisor1`, and another with `uniqueCnt2` not divisible by
 * `divisor2`, with no integer in both. Returns the smallest possible
 * largest integer used.
 *
 * Binary search the largest integer `x`. Up to `x`, each array needs
 * enough candidates of its own, and together they need `uniqueCnt1 +
 * uniqueCnt2` integers that aren't multiples of both divisors, which is to
 * say of their least common multiple.
 *
 * @see https://leetcode.com/problems/minimize-the-maximum-of-two-arrays/
 * @difficulty Medium
 * @timeComplexity O(log(c1 + c2))
 * @spaceComplexity O(1)
 *
 * @example
 * minimizeTheMaximumOfTwoArrays(2, 7, 1, 3); // 4
 */
export const minimizeTheMaximumOfTwoArrays = (
	divisor1: number,
	divisor2: number,
	uniqueCnt1: number,
	uniqueCnt2: number,
): number => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	const lcm = (divisor1 / gcd(divisor1, divisor2)) * divisor2;
	const enough = (x: number): boolean =>
		x - Math.floor(x / divisor1) >= uniqueCnt1 &&
		x - Math.floor(x / divisor2) >= uniqueCnt2 &&
		x - Math.floor(x / lcm) >= uniqueCnt1 + uniqueCnt2;

	let low = 1;
	let high = 2 * (uniqueCnt1 + uniqueCnt2);
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (enough(mid)) high = mid;
		else low = mid + 1;
	}
	return low;
};

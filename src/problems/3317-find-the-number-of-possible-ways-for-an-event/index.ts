const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3317. Find the Number of Possible Ways for an Event
 *
 * `n` performers each go to one of `x` stages, and each non-empty stage
 * (band) gets a score from 1 to `y`. Returns the number of possible events,
 * modulo 10⁹ + 7.
 *
 * Let `ways[k]` count the assignments of the performers so far onto exactly
 * k used stages: a new performer joins a used stage or opens one of the
 * x - k unused ones. Then each count with k bands is scored y^k ways.
 *
 * @see https://leetcode.com/problems/find-the-number-of-possible-ways-for-an-event/
 * @difficulty Hard
 * @timeComplexity O(n · x)
 * @spaceComplexity O(x)
 *
 * @example
 * findTheNumberOfPossibleWaysForAnEvent(5, 2, 1); // 32
 */
export const findTheNumberOfPossibleWaysForAnEvent = (
	n: number,
	x: number,
	y: number,
): number => {
	let ways = new Array<number>(x + 1).fill(0);
	ways[0] = 1;
	for (let performer = 0; performer < n; performer++) {
		const next = new Array<number>(x + 1).fill(0);
		for (let k = 1; k <= x; k++)
			next[k] =
				(multiply(ways[k] ?? 0, k) + multiply(ways[k - 1] ?? 0, x - k + 1)) %
				MOD;
		ways = next;
	}
	let total = 0;
	let scores = 1;
	for (let k = 1; k <= x; k++) {
		scores = multiply(scores, y);
		total = (total + multiply(ways[k] ?? 0, scores)) % MOD;
	}
	return total;
};

import { Heap } from "../../internal/heap";

/**
 * 3377. Digit Operations to Make Two Integers Equal
 *
 * Turn `n` into `m` (both with the same number of digits) by raising a
 * non-9 digit or lowering a non-0 digit, one at a time, never passing
 * through a prime. The cost is the sum of every value `n` takes, including
 * the first and last. Returns the smallest cost, or -1.
 *
 * Dijkstra over the numbers with that many digits, where entering a value
 * costs the value itself, skipping primes.
 *
 * @see https://leetcode.com/problems/digit-operations-to-make-two-integers-equal/
 * @difficulty Medium
 * @timeComplexity O(V log V), for V = 10^digits
 * @spaceComplexity O(V)
 *
 * @example
 * digitOperationsToMakeTwoIntegersEqual(10, 12); // 85
 */
export const digitOperationsToMakeTwoIntegersEqual = (
	n: number,
	m: number,
): number => {
	const digits = String(n).length;
	const limit = 10 ** digits;
	const composite = new Uint8Array(limit);
	composite[0] = 1;
	composite[1] = 1;
	for (let p = 2; p * p < limit; p++)
		if (!composite[p])
			for (let multiple = p * p; multiple < limit; multiple += p)
				composite[multiple] = 1;
	if (!composite[n] || !composite[m]) return -1;
	const best = new Float64Array(limit).fill(Number.POSITIVE_INFINITY);
	best[n] = n;
	const queue = new Heap<[cost: number, value: number]>(
		(a, b) => a[0] - b[0],
		[[n, n]],
	);
	for (let top = queue.pop(); top; top = queue.pop()) {
		const [cost, value] = top;
		if (value === m) return cost;
		if (cost > (best[value] ?? 0)) continue;
		for (let place = 1; place < limit; place *= 10) {
			const digit = Math.floor(value / place) % 10;
			for (const next of [
				digit < 9 ? value + place : -1,
				digit > 0 ? value - place : -1,
			]) {
				if (next < 0 || !composite[next]) continue;
				if (cost + next < (best[next] ?? 0)) {
					best[next] = cost + next;
					queue.push([cost + next, next]);
				}
			}
		}
	}
	return -1;
};

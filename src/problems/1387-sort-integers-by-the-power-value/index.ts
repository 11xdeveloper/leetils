/**
 * 1387. Sort Integers by The Power Value
 *
 * The power of `x` is the number of Collatz steps (halve if even, else
 * `3x + 1`) to reach 1. Returns the `k`th integer in `[lo, hi]` when sorted
 * by power, then by value.
 *
 * Computes powers with a cache shared across the range, then sorts.
 *
 * @see https://leetcode.com/problems/sort-integers-by-the-power-value/
 * @difficulty Medium
 * @timeComplexity O(r log r + total steps) for r = hi − lo + 1
 * @spaceComplexity O(r + total steps)
 *
 * @example
 * sortIntegersByThePowerValue(12, 15, 2); // 13
 */
export const sortIntegersByThePowerValue = (
	lo: number,
	hi: number,
	k: number,
): number => {
	const cache = new Map<number, number>([[1, 0]]);
	const power = (x: number): number => {
		const path: number[] = [];
		let current = x;
		while (!cache.has(current)) {
			path.push(current);
			current = current % 2 === 0 ? current / 2 : 3 * current + 1;
		}
		let steps = cache.get(current) ?? 0;
		for (let i = path.length - 1; i >= 0; i--) {
			steps++;
			cache.set(path[i] ?? 0, steps);
		}
		return cache.get(x) ?? 0;
	};
	const values = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
	const powers = new Map(values.map((x) => [x, power(x)]));
	values.sort((a, b) => (powers.get(a) ?? 0) - (powers.get(b) ?? 0) || a - b);
	return values[k - 1] ?? lo;
};

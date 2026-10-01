/**
 * 1655. Distribute Repeating Integers
 *
 * Returns whether each customer `i` can get `quantity[i]` equal integers
 * from `nums`, with no integer shared between customers.
 *
 * Only the count of each distinct value matters. With at most 10
 * customers, `served` is the set of customer groups satisfiable from the
 * values seen so far; each new value can satisfy any group of new
 * customers whose total fits in its count.
 *
 * @see https://leetcode.com/problems/distribute-repeating-integers/
 * @difficulty Hard
 * @timeComplexity O(n + 50 · 3^m) for m customers
 * @spaceComplexity O(2^m)
 *
 * @example
 * distributeRepeatingIntegers([1, 1, 2, 2], [2, 2]); // true
 */
export const distributeRepeatingIntegers = (
	nums: readonly number[],
	quantity: readonly number[],
): boolean => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const m = quantity.length;
	const full = (1 << m) - 1;
	const total = new Array<number>(1 << m).fill(0);
	for (let mask = 1; mask <= full; mask++) {
		const lowest = 31 - Math.clz32(mask & -mask);
		total[mask] = (total[mask & (mask - 1)] ?? 0) + (quantity[lowest] ?? 0);
	}
	let served = new Uint8Array(1 << m);
	served[0] = 1;
	for (const count of counts.values()) {
		const next = served.slice();
		for (let mask = 0; mask <= full; mask++) {
			if (!served[mask]) continue;
			const rest = full ^ mask;
			for (let group = rest; group > 0; group = (group - 1) & rest) {
				if ((total[group] ?? 0) <= count) next[mask | group] = 1;
			}
		}
		served = next;
		if (served[full]) return true;
	}
	return served[full] === 1;
};

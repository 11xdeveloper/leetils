/**
 * 3533. Concatenated Divisibility
 *
 * The lexicographically smallest permutation of `nums` whose decimal
 * concatenation is divisible by `k`, or `[]`.
 *
 * Work out, for every set of numbers still to place and remainder so far,
 * whether some order of them finishes at remainder 0. Then build the answer
 * greedily, trying the smallest number first at each step.
 *
 * @see https://leetcode.com/problems/concatenated-divisibility/
 * @difficulty Hard
 * @timeComplexity O(2ⁿ · k · n)
 * @spaceComplexity O(2ⁿ · k)
 *
 * @example
 * concatenatedDivisibility([3, 12, 45], 5); // [3, 12, 45]
 */
export const concatenatedDivisibility = (
	nums: readonly number[],
	k: number,
): number[] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const n = sorted.length;
	const full = (1 << n) - 1;
	const shift = sorted.map((num) => 10 ** String(num).length % k);
	const append = (remainder: number, i: number): number =>
		(remainder * (shift[i] ?? 1) + (sorted[i] ?? 0)) % k;
	// finishes[mask * k + r]: with `mask` placed and remainder r, the rest can reach 0.
	const finishes = new Uint8Array((1 << n) * k);
	finishes[full * k] = 1;
	for (let mask = full - 1; mask >= 0; mask--)
		for (let r = 0; r < k; r++)
			for (let i = 0; i < n; i++)
				if (
					!((mask >> i) & 1) &&
					finishes[(mask | (1 << i)) * k + append(r, i)]
				) {
					finishes[mask * k + r] = 1;
					break;
				}
	if (!finishes[0]) return [];
	const result: number[] = [];
	for (let mask = 0, r = 0; mask !== full; )
		for (let i = 0; i < n; i++) {
			if ((mask >> i) & 1) continue;
			const next = append(r, i);
			if (!finishes[(mask | (1 << i)) * k + next]) continue;
			result.push(sorted[i] ?? 0);
			mask |= 1 << i;
			r = next;
			break;
		}
	return result;
};

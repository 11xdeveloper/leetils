/**
 * 2198. Number of Single Divisor Triplets
 *
 * Counts the ordered triplets of distinct indices whose sum is divisible
 * by exactly one of the three numbers (all between 1 and 100).
 *
 * Count the numbers by value, then try every ordered triple of values,
 * multiplying the ways to pick distinct indices holding them.
 *
 * @see https://leetcode.com/problems/number-of-single-divisor-triplets/
 * @difficulty Medium
 * @timeComplexity O(n + 100^3)
 * @spaceComplexity O(100)
 *
 * @example
 * numberOfSingleDivisorTriplets([4, 6, 7, 3, 2]); // 12
 */
export const numberOfSingleDivisorTriplets = (
	nums: readonly number[],
): number => {
	const counts = new Array<number>(101).fill(0);
	for (const num of nums) counts[num] = (counts[num] ?? 0) + 1;
	const values = counts.flatMap((count, value) => (count ? [value] : []));
	let triplets = 0;
	for (const a of values) {
		for (const b of values) {
			for (const c of values) {
				const sum = a + b + c;
				const divisors =
					(sum % a === 0 ? 1 : 0) +
					(sum % b === 0 ? 1 : 0) +
					(sum % c === 0 ? 1 : 0);
				if (divisors !== 1) continue;
				triplets +=
					(counts[a] ?? 0) *
					((counts[b] ?? 0) - (b === a ? 1 : 0)) *
					((counts[c] ?? 0) - (c === a ? 1 : 0) - (c === b ? 1 : 0));
			}
		}
	}
	return triplets;
};

/**
 * 3587. Minimum Adjacent Swaps to Alternate Parity
 *
 * The fewest swaps of neighbours that make the parities of `nums`
 * alternate, or -1 if that's impossible.
 *
 * Even numbers never need to pass each other, so the k-th even goes to the
 * k-th even slot. Try each valid starting parity and sum how far the evens
 * move.
 *
 * @see https://leetcode.com/problems/minimum-adjacent-swaps-to-alternate-parity/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAdjacentSwapsToAlternateParity([2, 4, 6, 5, 7]); // 3
 */
export const minimumAdjacentSwapsToAlternateParity = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const evens = nums.flatMap((num, i) => (num % 2 === 0 ? [i] : []));
	const odds = n - evens.length;
	if (Math.abs(evens.length - odds) > 1) return -1;
	const cost = (first: number): number =>
		evens.reduce(
			(sum, position, k) => sum + Math.abs(position - (first + 2 * k)),
			0,
		);
	let best = Number.POSITIVE_INFINITY;
	if (evens.length >= odds) best = Math.min(best, cost(0));
	if (odds >= evens.length) best = Math.min(best, cost(1));
	return best;
};

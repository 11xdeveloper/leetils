/**
 * 2098. Subsequence of Size K With the Largest Even Sum
 *
 * Returns the largest even sum of `k` elements of the non-negative
 * `nums`, or -1 if no `k` elements have an even sum.
 *
 * Take the `k` largest. If their sum is odd, fix the parity with the
 * better of two swaps: the smallest chosen odd for the largest unchosen
 * even, or the smallest chosen even for the largest unchosen odd.
 *
 * @see https://leetcode.com/problems/subsequence-of-size-k-with-the-largest-even-sum/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * subsequenceOfSizeKWithTheLargestEvenSum([4, 1, 5, 3, 1], 3); // 12
 */
export const subsequenceOfSizeKWithTheLargestEvenSum = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = nums.toSorted((a, b) => b - a);
	const [chosen, rest] = [sorted.slice(0, k), sorted.slice(k)];
	const sum = chosen.reduce((total, v) => total + v, 0);
	if (sum % 2 === 0) return sum;

	const isOdd = (v: number): boolean => v % 2 === 1;
	const smallestChosen = (odd: boolean): number | undefined =>
		chosen.findLast((v) => isOdd(v) === odd);
	const largestRest = (odd: boolean): number | undefined =>
		rest.find((v) => isOdd(v) === odd);
	let best = -1;
	for (const odd of [true, false]) {
		const [out, swapIn] = [smallestChosen(odd), largestRest(!odd)];
		if (out !== undefined && swapIn !== undefined)
			best = Math.max(best, sum - out + swapIn);
	}
	return best;
};

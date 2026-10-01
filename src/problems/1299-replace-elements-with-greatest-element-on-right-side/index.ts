/**
 * 1299. Replace Elements with Greatest Element on Right Side
 *
 * Returns `arr` with each element replaced by the largest element to its
 * right, and the last by -1.
 *
 * Walks from the right keeping the largest element seen.
 *
 * @see https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * replaceElementsWithGreatestElementOnRightSide([17, 18, 5, 4, 6, 1]); // [18, 6, 6, 6, 1, -1]
 */
export const replaceElementsWithGreatestElementOnRightSide = (
	arr: readonly number[],
): number[] => {
	const result = new Array<number>(arr.length);
	let largest = -1;
	for (let i = arr.length - 1; i >= 0; i--) {
		result[i] = largest;
		largest = Math.max(largest, arr[i] ?? 0);
	}
	return result;
};

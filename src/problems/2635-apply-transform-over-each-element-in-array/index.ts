/**
 * 2635. Apply Transform Over Each Element in Array
 *
 * Map each element of `arr` to `fn(element, index)`, without
 * `Array.prototype.map`.
 *
 * Fill a new array of the same length.
 *
 * @see https://leetcode.com/problems/apply-transform-over-each-element-in-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * applyTransformOverEachElementInArray([1, 2, 3], (n) => n + 1); // [2, 3, 4]
 */
export function applyTransformOverEachElementInArray(
	arr: readonly number[],
	fn: (n: number, i: number) => number,
): number[] {
	const result = new Array<number>(arr.length);
	for (let i = 0; i < arr.length; i++) result[i] = fn(arr[i] ?? 0, i);
	return result;
}

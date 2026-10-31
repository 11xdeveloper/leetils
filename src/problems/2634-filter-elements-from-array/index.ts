/**
 * 2634. Filter Elements from Array
 *
 * Keep the elements of `arr` for which `fn(element, index)` is truthy,
 * without `Array.prototype.filter`.
 *
 * Push each element that passes onto a new array.
 *
 * @see https://leetcode.com/problems/filter-elements-from-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * filterElementsFromArray([0, 10, 20, 30], (n) => n > 10); // [20, 30]
 */
export function filterElementsFromArray(
	arr: readonly number[],
	fn: (n: number, i: number) => unknown,
): number[] {
	const result: number[] = [];
	arr.forEach((n, i) => {
		if (fn(n, i)) result.push(n);
	});
	return result;
}

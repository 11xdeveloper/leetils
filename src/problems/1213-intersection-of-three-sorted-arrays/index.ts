/**
 * 1213. Intersection of Three Sorted Arrays
 *
 * Returns, in order, the values found in all three strictly increasing
 * arrays.
 *
 * Walks the three arrays together, advancing whichever points at the
 * smallest value, and records a value when all three agree.
 *
 * @see https://leetcode.com/problems/intersection-of-three-sorted-arrays/
 * @difficulty Easy
 * @timeComplexity O(a + b + c)
 * @spaceComplexity O(1), excluding the result
 *
 * @example
 * intersectionOfThreeSortedArrays([1, 2, 3, 4, 5], [1, 2, 5, 7, 9], [1, 3, 4, 5, 8]); // [1, 5]
 */
export const intersectionOfThreeSortedArrays = (
	arr1: readonly number[],
	arr2: readonly number[],
	arr3: readonly number[],
): number[] => {
	const result: number[] = [];
	let [i, j, k] = [0, 0, 0];
	while (i < arr1.length && j < arr2.length && k < arr3.length) {
		const [a = 0, b = 0, c = 0] = [arr1[i], arr2[j], arr3[k]];
		if (a === b && b === c) {
			result.push(a);
			[i, j, k] = [i + 1, j + 1, k + 1];
			continue;
		}
		const smallest = Math.min(a, b, c);
		if (a === smallest) i++;
		if (b === smallest) j++;
		if (c === smallest) k++;
	}
	return result;
};

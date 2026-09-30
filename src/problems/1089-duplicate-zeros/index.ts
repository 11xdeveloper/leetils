/**
 * 1089. Duplicate Zeros
 *
 * Duplicates each zero in `arr`, shifting the rest right and dropping
 * whatever falls off the end. The array is modified in place, as the
 * problem requires.
 *
 * Counts how many zeros get duplicated within the array's length, then
 * fills from the back, writing each zero twice.
 *
 * @see https://leetcode.com/problems/duplicate-zeros/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const arr = [1, 0, 2, 3, 0, 4, 5, 0];
 * duplicateZeros(arr); // arr is now [1, 0, 0, 2, 3, 0, 0, 4]
 */
export const duplicateZeros = (arr: number[]): void => {
	const n = arr.length;
	let shifted = 0;
	for (let i = 0; i < n; i++) if (arr[i] === 0) shifted++;
	for (let read = n - 1; read >= 0; read--) {
		const write = read + shifted;
		if (arr[read] === 0) {
			if (write < n) arr[write] = 0;
			shifted--;
			if (read + shifted < n) arr[read + shifted] = 0;
		} else if (write < n) {
			arr[write] = arr[read] ?? 0;
		}
	}
};

/**
 * 1346. Check If N and Its Double Exist
 *
 * Returns whether some element of `arr` is exactly twice another (at a
 * different index).
 *
 * Remembers the values seen so far and checks each new value against them
 * both ways, which also handles a pair of zeros.
 *
 * @see https://leetcode.com/problems/check-if-n-and-its-double-exist/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfNAndItsDoubleExist([10, 2, 5, 3]); // true
 */
export const checkIfNAndItsDoubleExist = (arr: readonly number[]): boolean => {
	const seen = new Set<number>();
	for (const value of arr) {
		if (seen.has(2 * value) || seen.has(value / 2)) return true;
		seen.add(value);
	}
	return false;
};

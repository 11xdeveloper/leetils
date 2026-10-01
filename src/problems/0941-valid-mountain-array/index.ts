/**
 * 941. Valid Mountain Array
 *
 * Returns whether `arr` strictly rises and then strictly falls, with at
 * least one step each way.
 *
 * Climbs while rising, then descends while falling; it's a mountain if the
 * peak isn't at either end and the descent reaches the end.
 *
 * @see https://leetcode.com/problems/valid-mountain-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * validMountainArray([0, 3, 2, 1]); // true
 */
export const validMountainArray = (arr: readonly number[]): boolean => {
	let i = 0;
	while (i + 1 < arr.length && (arr[i] ?? 0) < (arr[i + 1] ?? 0)) i++;
	if (i === 0 || i === arr.length - 1) return false;
	while (i + 1 < arr.length && (arr[i] ?? 0) > (arr[i + 1] ?? 0)) i++;
	return i === arr.length - 1;
};

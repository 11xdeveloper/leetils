/**
 * 2774. Array Upper Bound
 *
 * `Array.prototype.upperBound(target)`: the last index of `target` in the
 * sorted array, or -1 if it isn't there. Install it with
 * `Array.prototype.upperBound = arrayUpperBound`, or call it with
 * `arrayUpperBound.call(nums, target)`.
 *
 * Binary search for the first element greater than `target`, then check the
 * one before it.
 *
 * @see https://leetcode.com/problems/array-upper-bound/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * arrayUpperBound.call([3, 4, 6, 6, 6, 6, 7], 6); // 5
 */
export function arrayUpperBound(
	this: readonly number[],
	target: number,
): number {
	let lo = 0;
	let hi = this.length;
	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		if ((this[mid] ?? 0) <= target) lo = mid + 1;
		else hi = mid;
	}
	return lo > 0 && this[lo - 1] === target ? lo - 1 : -1;
}

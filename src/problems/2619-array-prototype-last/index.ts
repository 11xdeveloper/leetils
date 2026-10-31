/**
 * 2619. Array Prototype Last
 *
 * `Array.prototype.last`: the array's last element, or -1 if it's empty.
 * Install it with `Array.prototype.last = arrayPrototypeLast`, or call it
 * directly with `arrayPrototypeLast.call(array)`.
 *
 * Read the element at `length - 1`.
 *
 * @see https://leetcode.com/problems/array-prototype-last/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * arrayPrototypeLast.call([null, {}, 3]); // 3
 * arrayPrototypeLast.call([]); // -1
 */
export function arrayPrototypeLast(this: readonly unknown[]): unknown {
	return this.length === 0 ? -1 : this[this.length - 1];
}

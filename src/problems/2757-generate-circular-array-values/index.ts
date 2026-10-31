/**
 * 2757. Generate Circular Array Values
 *
 * A generator over `arr` treated as circular. The first `next()` yields
 * `arr[startIndex]`, and each `next(jump)` after that moves `jump` places
 * (backwards if negative), wrapping around the ends, and yields the element
 * there.
 *
 * Keep the current index and move it modulo the length, correcting negative
 * remainders.
 *
 * @see https://leetcode.com/problems/generate-circular-array-values/
 * @difficulty Medium
 * @timeComplexity O(1) per value
 * @spaceComplexity O(1)
 *
 * @example
 * const values = generateCircularArrayValues([1, 2, 3, 4, 5], 0);
 * values.next().value; // 1
 * values.next(1).value; // 2
 * values.next(-3).value; // 4
 */
export function* generateCircularArrayValues<T>(
	arr: readonly T[],
	startIndex: number,
): Generator<T, void, number> {
	const n = arr.length;
	let index = ((startIndex % n) + n) % n;
	for (;;) {
		const jump: number = yield arr[index] as T;
		index = (((index + jump) % n) + n) % n;
	}
}

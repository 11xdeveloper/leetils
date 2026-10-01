/**
 * 1243. Array Transformation
 *
 * Each day, every element (besides the ends) smaller than both neighbours
 * goes up by one and every element larger than both goes down by one, all
 * at once. Returns the array once it stops changing.
 *
 * Simulates the days. Each day shrinks the gap between some peak or valley
 * and its neighbours, so it settles within about `max(arr)` days.
 *
 * @see https://leetcode.com/problems/array-transformation/
 * @difficulty Easy
 * @timeComplexity O(n · max(arr))
 * @spaceComplexity O(n)
 *
 * @example
 * arrayTransformation([1, 6, 3, 4, 3, 5]); // [1, 4, 4, 4, 4, 5]
 */
export const arrayTransformation = (arr: readonly number[]): number[] => {
	let current = [...arr];
	for (let changed = true; changed; ) {
		changed = false;
		const previous = current;
		current = previous.map((value, i) => {
			const [left, right] = [previous[i - 1], previous[i + 1]];
			if (left === undefined || right === undefined) return value;
			if (value < left && value < right) {
				changed = true;
				return value + 1;
			}
			if (value > left && value > right) {
				changed = true;
				return value - 1;
			}
			return value;
		});
	}
	return current;
};

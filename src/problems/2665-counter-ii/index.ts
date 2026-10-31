/**
 * 2665. Counter II
 *
 * A counter starting at `init`, with `increment` and `decrement`, which
 * change it by one and return the new value, and `reset`, which sets it back
 * to `init` and returns that.
 *
 * Close over the current value.
 *
 * @see https://leetcode.com/problems/counter-ii/
 * @difficulty Easy
 * @timeComplexity O(1) per call
 * @spaceComplexity O(1)
 *
 * @example
 * const counter = counterII(5);
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */
export function counterII(init: number): {
	increment: () => number;
	decrement: () => number;
	reset: () => number;
} {
	let value = init;
	return {
		increment: () => ++value,
		decrement: () => --value,
		reset: () => {
			value = init;
			return value;
		},
	};
}

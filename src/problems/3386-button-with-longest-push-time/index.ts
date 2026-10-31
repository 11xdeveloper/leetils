/**
 * 3386. Button with Longest Push Time
 *
 * `events[i] = [button, time]` records presses in time order; a press takes
 * from the previous press (or time 0) until its time. Returns the button
 * with the longest press, the smallest index on a tie.
 *
 * Compare each press's duration.
 *
 * @see https://leetcode.com/problems/button-with-longest-push-time/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * buttonWithLongestPushTime([[1, 2], [2, 5], [3, 9], [1, 15]]); // 1
 */
export const buttonWithLongestPushTime = (
	events: readonly (readonly number[])[],
): number => {
	let best = 0;
	let longest = -1;
	let previous = 0;
	for (const [button = 0, time = 0] of events) {
		const duration = time - previous;
		if (duration > longest || (duration === longest && button < best)) {
			best = button;
			longest = duration;
		}
		previous = time;
	}
	return best;
};

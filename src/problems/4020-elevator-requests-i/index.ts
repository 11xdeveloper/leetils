/**
 * 4020. Elevator Requests I
 *
 * An elevator starts at floor 0 and visits `requests` in order, one floor
 * per second. Returns the total time taken.
 *
 * @see https://leetcode.com/problems/elevator-requests-i/
 * @difficulty Easy
 * @timeComplexity O(r)
 * @spaceComplexity O(1)
 *
 * @example
 * elevatorRequestsI(5, [2, 1, 4, 3]); // 7
 */
export const elevatorRequestsI = (
	_n: number,
	requests: readonly number[],
): number => {
	let [at, time] = [0, 0];
	for (const floor of requests) {
		time += Math.abs(floor - at);
		at = floor;
	}
	return time;
};

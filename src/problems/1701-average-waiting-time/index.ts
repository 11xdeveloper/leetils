/**
 * 1701. Average Waiting Time
 *
 * A single chef serves `customers` (`[arrival, time]`, sorted by arrival)
 * in order. Returns the average time from arrival to receiving the order.
 *
 * Track when the chef becomes free: each order starts at the later of that
 * and the arrival.
 *
 * @see https://leetcode.com/problems/average-waiting-time/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * averageWaitingTime([[1, 2], [2, 5], [4, 3]]); // 5
 */
export const averageWaitingTime = (
	customers: readonly (readonly number[])[],
): number => {
	let [free, waiting] = [0, 0];
	for (const [arrival = 0, time = 0] of customers) {
		free = Math.max(free, arrival) + time;
		waiting += free - arrival;
	}
	return waiting / customers.length;
};

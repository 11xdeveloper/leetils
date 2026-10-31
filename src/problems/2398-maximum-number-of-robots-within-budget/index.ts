/**
 * 2398. Maximum Number of Robots Within Budget
 *
 * Running `k` consecutive robots costs the largest charge time plus `k`
 * times their total running cost. Returns the most consecutive robots
 * that fit `budget`.
 *
 * Slide a window, tracking its maximum charge time with a monotonic deque
 * and its running-cost sum; shrink from the left while over budget.
 *
 * @see https://leetcode.com/problems/maximum-number-of-robots-within-budget/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfRobotsWithinBudget([3, 6, 1, 3, 4], [2, 1, 3, 4, 5], 25); // 3
 */
export const maximumNumberOfRobotsWithinBudget = (
	chargeTimes: readonly number[],
	runningCosts: readonly number[],
	budget: number,
): number => {
	const deque: number[] = [];
	let [head, start, sum, best] = [0, 0, 0, 0];
	for (const [end, charge] of chargeTimes.entries()) {
		while (
			deque.length > head &&
			(chargeTimes[deque.at(-1) ?? 0] ?? 0) <= charge
		)
			deque.pop();
		deque.push(end);
		sum += runningCosts[end] ?? 0;
		while (
			start <= end &&
			(chargeTimes[deque[head] ?? 0] ?? 0) + (end - start + 1) * sum > budget
		) {
			sum -= runningCosts[start] ?? 0;
			if (deque[head] === start) head++;
			start++;
		}
		best = Math.max(best, end - start + 1);
	}
	return best;
};

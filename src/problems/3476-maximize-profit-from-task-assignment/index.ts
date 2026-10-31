/**
 * 3476. Maximize Profit from Task Assignment
 *
 * Each worker can do one task whose skill requirement matches their skill
 * exactly, and one extra worker can do any task. Returns the most profit.
 *
 * For each skill, give its workers that skill's most profitable tasks;
 * then the extra worker takes the best task left over.
 *
 * @see https://leetcode.com/problems/maximize-profit-from-task-assignment/
 * @difficulty Medium
 * @timeComplexity O((n + m) log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * maximizeProfitFromTaskAssignment([1, 2, 3, 4, 5], [[1, 100], [2, 400], [3, 100], [3, 400]]); // 1000
 */
export const maximizeProfitFromTaskAssignment = (
	workers: readonly number[],
	tasks: readonly (readonly number[])[],
): number => {
	const bySkill = new Map<number, number[]>();
	for (const [skill = 0, profit = 0] of tasks)
		bySkill.set(skill, [...(bySkill.get(skill) ?? []), profit]);
	const workerCount = new Map<number, number>();
	for (const skill of workers)
		workerCount.set(skill, (workerCount.get(skill) ?? 0) + 1);
	let total = 0;
	let bestLeft = 0;
	for (const [skill, profits] of bySkill) {
		profits.sort((a, b) => b - a);
		const taken = Math.min(profits.length, workerCount.get(skill) ?? 0);
		for (let i = 0; i < taken; i++) total += profits[i] ?? 0;
		bestLeft = Math.max(bestLeft, profits[taken] ?? 0);
	}
	return total + bestLeft;
};

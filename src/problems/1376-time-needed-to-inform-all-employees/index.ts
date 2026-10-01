/**
 * 1376. Time Needed to Inform All Employees
 *
 * News spreads down a company's management tree from `headID`; employee
 * `i` takes `informTime[i]` minutes to tell their direct reports. Returns
 * how long until everyone knows.
 *
 * Breadth-first search from the head, where each employee hears the news
 * when their manager heard it plus the manager's inform time. The answer
 * is the latest of those.
 *
 * @see https://leetcode.com/problems/time-needed-to-inform-all-employees/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * timeNeededToInformAllEmployees(6, 2, [2, 2, -1, 2, 2, 2], [0, 0, 1, 0, 0, 0]); // 1
 */
export const timeNeededToInformAllEmployees = (
	n: number,
	headID: number,
	manager: readonly number[],
	informTime: readonly number[],
): number => {
	const reports = Array.from({ length: n }, (): number[] => []);
	manager.forEach((boss, employee) => {
		if (boss !== -1) reports[boss]?.push(employee);
	});
	const heard = new Array<number>(n).fill(0);
	const queue = [headID];
	let latest = 0;
	for (let i = 0; i < queue.length; i++) {
		const employee = queue[i] ?? 0;
		latest = Math.max(latest, heard[employee] ?? 0);
		for (const report of reports[employee] ?? []) {
			heard[report] = (heard[employee] ?? 0) + (informTime[employee] ?? 0);
			queue.push(report);
		}
	}
	return latest;
};

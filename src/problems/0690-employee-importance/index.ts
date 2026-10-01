/** An employee, as LeetCode provides: an ID, an importance and the IDs of their direct subordinates. */
interface Employee {
	id: number;
	importance: number;
	subordinates: readonly number[];
}

/**
 * 690. Employee Importance
 *
 * Returns the total importance of the employee with ID `id` and everyone
 * under them, directly or indirectly.
 *
 * Indexes the employees by ID, then walks down the reporting tree with a
 * queue, adding up importances.
 *
 * @see https://leetcode.com/problems/employee-importance/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * employeeImportance([{ id: 1, importance: 5, subordinates: [2, 3] }, { id: 2, importance: 3, subordinates: [] }, { id: 3, importance: 3, subordinates: [] }], 1); // 11
 */
export const employeeImportance = (
	employees: readonly Employee[],
	id: number,
): number => {
	const byId = new Map(employees.map((employee) => [employee.id, employee]));
	let total = 0;
	const queue = [id];
	for (const current of queue) {
		const employee = byId.get(current);
		if (!employee) continue;
		total += employee.importance;
		queue.push(...employee.subordinates);
	}
	return total;
};

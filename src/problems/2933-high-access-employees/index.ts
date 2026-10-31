/**
 * 2933. High-Access Employees
 *
 * `access_times` lists `[employee, "HHMM"]` access records within one
 * day. Returns the employees with three or more accesses within some
 * period of under an hour.
 *
 * Sort each employee's times in minutes and check every run of three.
 *
 * @see https://leetcode.com/problems/high-access-employees/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * highAccessEmployees([["a", "0549"], ["b", "0457"], ["a", "0532"], ["a", "0621"], ["b", "0540"]]); // ["a"]
 */
export const highAccessEmployees = (
	access_times: readonly (readonly string[])[],
): string[] => {
	const times = new Map<string, number[]>();
	for (const [name = "", time = "0000"] of access_times) {
		const minutes = Number(time.slice(0, 2)) * 60 + Number(time.slice(2));
		times.set(name, [...(times.get(name) ?? []), minutes]);
	}
	const result: string[] = [];
	for (const [name, list] of times) {
		list.sort((a, b) => a - b);
		if (list.some((t, i) => i >= 2 && t - (list[i - 2] ?? 0) < 60))
			result.push(name);
	}
	return result;
};

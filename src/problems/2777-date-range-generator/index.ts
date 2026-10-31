const DAY = 24 * 60 * 60 * 1000;

/**
 * 2777. Date Range Generator
 *
 * A generator over the dates from `start` to `end` inclusive, `step` days
 * apart, all as `"YYYY-MM-DD"`.
 *
 * Parse the dates as UTC midnights and step by whole days in milliseconds,
 * which UTC keeps free of daylight saving shifts.
 *
 * @see https://leetcode.com/problems/date-range-generator/
 * @difficulty Medium
 * @timeComplexity O(1) per date
 * @spaceComplexity O(1)
 *
 * @example
 * [...dateRangeGenerator("2023-04-01", "2023-04-04", 1)];
 * // ["2023-04-01", "2023-04-02", "2023-04-03", "2023-04-04"]
 */
export function* dateRangeGenerator(
	start: string,
	end: string,
	step: number,
): Generator<string, void, unknown> {
	const last = Date.parse(end);
	for (let time = Date.parse(start); time <= last; time += step * DAY)
		yield new Date(time).toISOString().slice(0, 10);
}

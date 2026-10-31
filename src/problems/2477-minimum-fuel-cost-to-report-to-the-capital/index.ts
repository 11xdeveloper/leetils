/**
 * 2477. Minimum Fuel Cost to Report to the Capital
 *
 * A representative from every city of a tree drives to city 0 in cars of
 * `seats` seats, sharing cars along the way; each road a car crosses costs
 * a litre. Returns the least fuel.
 *
 * Everyone below a road must cross it, needing `⌈people / seats⌉` cars.
 *
 * @see https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumFuelCostToReportToTheCapital([[3, 1], [3, 2], [1, 0], [0, 4], [0, 5], [4, 6]], 2); // 7
 */
export const minimumFuelCostToReportToTheCapital = (
	roads: readonly (readonly number[])[],
	seats: number,
): number => {
	const n = roads.length + 1;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of roads) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = new Array<number>(n).fill(-1);
	const order = [0];
	for (let head = 0; head < order.length; head++) {
		const city = order[head] ?? 0;
		for (const next of neighbours[city] ?? []) {
			if (next === parent[city]) continue;
			parent[next] = city;
			order.push(next);
		}
	}
	const people = new Array<number>(n).fill(1);
	let fuel = 0;
	for (const city of order.toReversed()) {
		if (city === 0) continue;
		fuel += Math.ceil((people[city] ?? 0) / seats);
		const up = parent[city] ?? 0;
		people[up] = (people[up] ?? 0) + (people[city] ?? 0);
	}
	return fuel;
};

/**
 * 134. Gas Station
 *
 * Stations around a circular route each have `gas[i]` fuel, and driving to
 * the next one costs `cost[i]`. Returns the index of the station where an
 * empty tank can start and complete the circuit, or -1 if none can. The
 * answer is unique when it exists.
 *
 * If the total gas covers the total cost, a solution exists. Starting from
 * station 0, whenever the tank goes negative, no station up to there can be
 * the start, so the candidate moves to the next station.
 *
 * @see https://leetcode.com/problems/gas-station/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * gasStation([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]); // 3
 */
export const gasStation = (
	gas: readonly number[],
	cost: readonly number[],
): number => {
	let total = 0;
	let tank = 0;
	let start = 0;

	for (const [i, fuel] of gas.entries()) {
		const change = fuel - (cost[i] ?? 0);
		total += change;
		tank += change;
		if (tank < 0) {
			start = i + 1;
			tank = 0;
		}
	}

	return total >= 0 ? start : -1;
};

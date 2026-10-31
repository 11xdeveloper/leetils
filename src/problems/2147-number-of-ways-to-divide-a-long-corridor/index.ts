/**
 * 2147. Number of Ways to Divide a Long Corridor
 *
 * A corridor of seats "S" and plants "P" is divided into sections with
 * exactly two seats each. Counts the ways to place the dividers, modulo
 * 10^9 + 7.
 *
 * Between each pair of seats and the next, a divider can go in any of
 * (plants between them + 1) gaps; multiply those choices.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-divide-a-long-corridor/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfWaysToDivideALongCorridor("SSPPSPS"); // 3
 */
export const numberOfWaysToDivideALongCorridor = (corridor: string): number => {
	const MOD = 1_000_000_007;
	let [ways, seats, lastSeat] = [1, 0, -1];
	for (const [i, char] of [...corridor].entries()) {
		if (char !== "S") continue;
		seats++;
		// The first seat of each later pair: gaps since the previous pair.
		if (seats > 2 && seats % 2 === 1) ways = (ways * (i - lastSeat)) % MOD;
		lastSeat = i;
	}
	return seats > 0 && seats % 2 === 0 ? ways : 0;
};

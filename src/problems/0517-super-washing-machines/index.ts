/**
 * 517. Super Washing Machines
 *
 * Washing machines in a line hold `machines[i]` dresses. In one move, any
 * number of machines can each pass one dress to a neighbour, all at once.
 * Returns the fewest moves to give every machine the same number, or -1 if
 * that's impossible.
 *
 * Each machine must end with the average. Across each gap between
 * machines, the net number of dresses that must flow is the surplus of
 * everything to its left, and at most one crosses per move. A machine can
 * also only send one dress per move, so one holding `x` over the average
 * needs `x` moves. The answer is the largest of these bounds, which is
 * achievable.
 *
 * @see https://leetcode.com/problems/super-washing-machines/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * superWashingMachines([1, 0, 5]); // 3
 */
export const superWashingMachines = (machines: readonly number[]): number => {
	const total = machines.reduce((sum, dresses) => sum + dresses, 0);
	if (total % machines.length !== 0) return -1;
	const average = total / machines.length;

	let moves = 0;
	let flow = 0;
	for (const dresses of machines) {
		const surplus = dresses - average;
		flow += surplus;
		moves = Math.max(moves, Math.abs(flow), surplus);
	}

	return moves;
};

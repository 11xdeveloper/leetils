/**
 * 3389. Minimum Operations to Make Character Frequencies Equal
 *
 * Delete a letter, insert a letter, or change a letter to the next one in
 * the alphabet. Returns the fewest operations to make every letter that
 * appears in `s` appear equally often.
 *
 * Try every target frequency t. Each letter ends with 0 or t copies, so it
 * has a surplus to delete and a shortfall to insert. Changing a letter to
 * the next one fixes a surplus and the next letter's shortfall in one step
 * (going further costs as much as deleting and inserting). Dynamic
 * programming along the alphabet over each letter's choice passes its
 * surplus on to the next.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-character-frequencies-equal/
 * @difficulty Hard
 * @timeComplexity O(n + 26 · n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeCharacterFrequenciesEqual("acab"); // 1
 */
export const minimumOperationsToMakeCharacterFrequenciesEqual = (
	s: string,
): number => {
	const counts = new Array<number>(26).fill(0);
	for (let i = 0; i < s.length; i++)
		counts[s.charCodeAt(i) - 97] = (counts[s.charCodeAt(i) - 97] ?? 0) + 1;
	let best = s.length;
	for (let target = 1; target <= Math.max(...counts); target++) {
		// [cost so far, surplus passed on] for the previous letter becoming 0 or the target.
		let states: [number, number][] = [[0, 0]];
		for (const count of counts) {
			const next: [number, number][] = [];
			for (const goal of [0, target]) {
				const shortfall = Math.max(0, goal - count);
				const surplus = goal === 0 ? count : Math.max(0, count - goal);
				let cost = Number.POSITIVE_INFINITY;
				for (const [before, carried] of states) {
					const moved = Math.min(carried, shortfall);
					cost = Math.min(
						cost,
						before + (carried - moved) + moved + (shortfall - moved),
					);
				}
				next.push([cost, surplus]);
			}
			states = next;
		}
		best = Math.min(best, ...states.map(([cost, surplus]) => cost + surplus));
	}
	return best;
};

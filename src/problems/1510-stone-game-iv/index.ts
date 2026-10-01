/**
 * 1510. Stone Game IV
 *
 * Players alternately remove a positive square number of stones from a
 * pile of `n`; whoever can't move loses. Returns whether the first player
 * (Alice) wins.
 *
 * A position wins if some square move leads to a losing position. Fill
 * that in for every pile size up to `n`.
 *
 * @see https://leetcode.com/problems/stone-game-iv/
 * @difficulty Hard
 * @timeComplexity O(n √n)
 * @spaceComplexity O(n)
 *
 * @example
 * stoneGameIV(4); // true
 */
export const stoneGameIV = (n: number): boolean => {
	const wins = new Uint8Array(n + 1);
	for (let stones = 1; stones <= n; stones++) {
		for (let root = 1; root * root <= stones; root++) {
			if (!wins[stones - root * root]) {
				wins[stones] = 1;
				break;
			}
		}
	}
	return wins[n] === 1;
};

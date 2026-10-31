/**
 * 2511. Maximum Enemy Forts That Can Be Captured
 *
 * `forts` holds 1 for your forts, 0 for enemy forts and -1 for empty
 * positions. An army can march from one of your forts to an empty
 * position, capturing the enemy forts in between, if every position
 * between them is an enemy fort. Returns the most forts one march can
 * capture.
 *
 * Look at each pair of consecutive non-enemy positions; if one is yours
 * and the other empty, the enemies between them are capturable.
 *
 * @see https://leetcode.com/problems/maximum-enemy-forts-that-can-be-captured/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumEnemyFortsThatCanBeCaptured([1, 0, 0, -1, 0, 0, 0, 0, 1]); // 4
 */
export const maximumEnemyFortsThatCanBeCaptured = (
	forts: readonly number[],
): number => {
	let best = 0;
	let previous = -1;
	for (let i = 0; i < forts.length; i++) {
		const fort = forts[i] ?? 0;
		if (fort === 0) continue;
		if (previous >= 0 && (forts[previous] ?? 0) === -fort)
			best = Math.max(best, i - previous - 1);
		previous = i;
	}
	return best;
};

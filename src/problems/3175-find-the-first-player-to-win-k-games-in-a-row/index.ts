/**
 * 3175. Find The First Player to win K Games in a Row
 *
 * Players queue up by index with distinct skills. The front two play, the
 * more skilled wins and stays at the front, and the loser goes to the back.
 * Returns the index of the first player to win `k` games in a row.
 *
 * In one pass through the queue the champion so far meets every player. If
 * nobody racks up `k` wins on the way, the strongest player wins forever.
 *
 * @see https://leetcode.com/problems/find-the-first-player-to-win-k-games-in-a-row/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheFirstPlayerToWinKGamesInARow([4, 2, 6, 3, 9], 2); // 2
 */
export const findTheFirstPlayerToWinKGamesInARow = (
	skills: readonly number[],
	k: number,
): number => {
	let champion = 0;
	let wins = 0;
	for (let i = 1; i < skills.length; i++) {
		if ((skills[i] ?? 0) > (skills[champion] ?? 0)) {
			champion = i;
			wins = 1;
		} else wins++;
		if (wins === k) return champion;
	}
	return champion;
};

/**
 * 3238. Find the Number of Winning Players
 *
 * `pick[j] = [x, y]` means player x picked a ball of color y. Player i wins
 * if they picked more than i balls of one color. Returns how many win.
 *
 * Count picks per player and color.
 *
 * @see https://leetcode.com/problems/find-the-number-of-winning-players/
 * @difficulty Easy
 * @timeComplexity O(n · C + m), for C colors
 * @spaceComplexity O(n · C)
 *
 * @example
 * findTheNumberOfWinningPlayers(4, [[0, 0], [1, 0], [1, 0], [2, 1], [2, 1], [2, 0]]); // 2
 */
export const findTheNumberOfWinningPlayers = (
	n: number,
	pick: readonly (readonly number[])[],
): number => {
	const counts = Array.from({ length: n }, () => new Map<number, number>());
	const winners = new Set<number>();
	for (const [player = 0, color = 0] of pick) {
		const map = counts[player];
		if (!map) continue;
		const count = (map.get(color) ?? 0) + 1;
		map.set(color, count);
		if (count > player) winners.add(player);
	}
	return winners.size;
};

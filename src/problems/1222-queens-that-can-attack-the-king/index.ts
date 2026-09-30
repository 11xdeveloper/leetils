/**
 * 1222. Queens That Can Attack the King
 *
 * On an 8 × 8 board, returns the queens that can attack the king directly,
 * in any order.
 *
 * Looks outwards from the king in each of the eight directions and takes
 * the first queen met, as it blocks any behind it.
 *
 * @see https://leetcode.com/problems/queens-that-can-attack-the-king/
 * @difficulty Medium
 * @timeComplexity O(q) for q queens
 * @spaceComplexity O(q)
 *
 * @example
 * queensThatCanAttackTheKing([[0, 1], [1, 0], [4, 0], [0, 4], [3, 3], [2, 4]], [0, 0]); // [[0, 1], [1, 0], [3, 3]]
 */
export const queensThatCanAttackTheKing = (
	queens: readonly (readonly number[])[],
	king: readonly number[],
): number[][] => {
	const occupied = new Set(queens.map(([x = 0, y = 0]) => x * 8 + y));
	const [kingX = 0, kingY = 0] = king;
	const attackers: number[][] = [];
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			if (dx === 0 && dy === 0) continue;
			for (
				let [x, y] = [kingX + dx, kingY + dy];
				x >= 0 && x < 8 && y >= 0 && y < 8;
				[x, y] = [x + dx, y + dy]
			) {
				if (occupied.has(x * 8 + y)) {
					attackers.push([x, y]);
					break;
				}
			}
		}
	}
	return attackers;
};

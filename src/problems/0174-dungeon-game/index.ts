/**
 * 174. Dungeon Game
 *
 * A knight starts in the top-left room of a dungeon and must reach the
 * princess in the bottom-right room, moving only right or down. Each room
 * adds to or takes from his health, which must stay at least 1 throughout.
 * Returns the least starting health that makes the journey possible.
 *
 * Dynamic programming backwards from the princess: the health needed on
 * entering a room is whatever the cheaper next room needs, minus this
 * room's effect, but never less than 1. Keeps one row at a time.
 *
 * @see https://leetcode.com/problems/dungeon-game/
 * @difficulty Hard
 * @timeComplexity O(m * n)
 * @spaceComplexity O(n)
 *
 * @example
 * dungeonGame([[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]); // 7
 */
export const dungeonGame = (
	dungeon: readonly (readonly number[])[],
): number => {
	const columns = dungeon[0]?.length ?? 0;
	// needed[c] is the health needed on entering room (r, c); the extra slot
	// past the last column lets the princess's room need just 1 on leaving.
	const needed = new Array<number>(columns + 1).fill(Number.POSITIVE_INFINITY);
	needed[columns - 1] = 1;

	for (let r = dungeon.length - 1; r >= 0; r--) {
		const row = dungeon[r] ?? [];
		for (let c = columns - 1; c >= 0; c--) {
			const next =
				r === dungeon.length - 1 && c === columns - 1
					? 1
					: Math.min(
							needed[c] ?? Number.POSITIVE_INFINITY,
							needed[c + 1] ?? Number.POSITIVE_INFINITY,
						);
			needed[c] = Math.max(1, next - (row[c] ?? 0));
		}
	}

	return needed[0] ?? 1;
};

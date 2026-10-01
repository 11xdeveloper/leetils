/**
 * 1996. The Number of Weak Characters in the Game
 *
 * A character is weak if another has strictly greater attack and defense.
 * Counts the weak characters.
 *
 * Sort by attack descending and, within equal attack, defense ascending;
 * then a character is weak exactly when some earlier one had more
 * defense.
 *
 * @see https://leetcode.com/problems/the-number-of-weak-characters-in-the-game/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * theNumberOfWeakCharactersInTheGame([[1, 5], [10, 4], [4, 3]]); // 1
 */
export const theNumberOfWeakCharactersInTheGame = (
	properties: readonly (readonly number[])[],
): number => {
	const sorted = properties.toSorted(
		([a1 = 0, d1 = 0], [a2 = 0, d2 = 0]) => a2 - a1 || d1 - d2,
	);
	let [weak, strongest] = [0, 0];
	for (const [, defense = 0] of sorted) {
		if (defense < strongest) weak++;
		else strongest = defense;
	}
	return weak;
};

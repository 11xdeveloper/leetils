/**
 * 2038. Remove Colored Pieces if Both Neighbors are the Same Color
 *
 * Alice removes an "A" whose neighbours are both "A", Bob likewise a "B";
 * whoever can't move loses. Returns whether Alice, moving first, wins.
 *
 * Moves never create or block the other player's moves, so each player
 * has a fixed number: the middles of runs of three. Alice needs more.
 *
 * @see https://leetcode.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * removeColoredPiecesIfBothNeighborsAreTheSameColor("AAABABB"); // true
 */
export const removeColoredPiecesIfBothNeighborsAreTheSameColor = (
	colors: string,
): boolean => {
	let [alice, bob] = [0, 0];
	for (let i = 1; i < colors.length - 1; i++) {
		const color = colors[i];
		if (colors[i - 1] !== color || colors[i + 1] !== color) continue;
		if (color === "A") alice++;
		else bob++;
	}
	return alice > bob;
};

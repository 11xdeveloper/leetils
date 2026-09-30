/**
 * 1104. Path In Zigzag Labelled Binary Tree
 *
 * An infinite binary tree is labelled row by row, left to right on odd rows
 * and right to left on even rows. Returns the labels on the path from the
 * root to `label`.
 *
 * In an ordinary labelling the parent of `x` is `⌊x / 2⌋`. Zigzagging
 * mirrors every other row, and mirroring a label within row `d` (which
 * holds `2^d … 2^(d+1) − 1`) maps it to `2^d + 2^(d+1) − 1 − x`. So each
 * step up halves the label, then mirrors it in the row above.
 *
 * @see https://leetcode.com/problems/path-in-zigzag-labelled-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(log label)
 * @spaceComplexity O(log label), for the result
 *
 * @example
 * pathInZigzagLabelledBinaryTree(14); // [1, 3, 4, 14]
 */
export const pathInZigzagLabelledBinaryTree = (label: number): number[] => {
	let depth = Math.floor(Math.log2(label));
	while (2 ** (depth + 1) <= label) depth++;
	while (2 ** depth > label) depth--;
	const path: number[] = [];
	for (; depth >= 0; depth--) {
		path.push(label);
		label = 2 ** (depth - 1) + 2 ** depth - 1 - Math.floor(label / 2);
	}
	return path.reverse();
};

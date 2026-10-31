import type { ListNode } from "../../structures/list-node";

/**
 * 2326. Spiral Matrix IV
 *
 * Fills an `m × n` matrix clockwise in a spiral from the top-left with the
 * values of a linked list, leaving -1 where the list runs out.
 *
 * Walk the spiral, turning when the next cell is outside or already
 * filled.
 *
 * @see https://leetcode.com/problems/spiral-matrix-iv/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * spiralMatrixIV(1, 4, listFromArray([0, 1, 2])); // [[0, 1, 2, -1]]
 */
export const spiralMatrixIV = (
	m: number,
	n: number,
	head: ListNode | null,
): number[][] => {
	const matrix = Array.from({ length: m }, () => new Array<number>(n).fill(-1));
	const moves = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	];
	let [r, c, direction] = [0, 0, 0];
	for (let node = head; node; node = node.next) {
		(matrix[r] ?? [])[c] = node.val;
		const [dr = 0, dc = 0] = moves[direction] ?? [];
		if (matrix[r + dr]?.[c + dc] !== -1) direction = (direction + 1) % 4;
		const [tr = 0, tc = 0] = moves[direction] ?? [];
		[r, c] = [r + tr, c + tc];
	}
	return matrix;
};

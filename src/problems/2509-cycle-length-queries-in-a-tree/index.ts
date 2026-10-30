/**
 * 2509. Cycle Length Queries in a Tree
 *
 * In a complete binary tree numbered from 1, where node `v` has children
 * `2v` and `2v + 1`, each query adds an edge between two nodes. Returns
 * the length of the cycle each added edge would make.
 *
 * Walk the larger label up to its parent until the two meet; the cycle is
 * the steps taken plus the new edge.
 *
 * @see https://leetcode.com/problems/cycle-length-queries-in-a-tree/
 * @difficulty Hard
 * @timeComplexity O(q · n)
 * @spaceComplexity O(q)
 *
 * @example
 * cycleLengthQueriesInATree(3, [[5, 3], [4, 7], [2, 3]]); // [4, 5, 3]
 */
export const cycleLengthQueriesInATree = (
	_n: number,
	queries: readonly (readonly number[])[],
): number[] =>
	queries.map(([a = 1, b = 1]) => {
		let length = 1;
		while (a !== b) {
			if (a > b) a = Math.floor(a / 2);
			else b = Math.floor(b / 2);
			length++;
		}
		return length;
	});

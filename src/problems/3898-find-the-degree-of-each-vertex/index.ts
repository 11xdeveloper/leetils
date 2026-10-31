/**
 * 3898. Find the Degree of Each Vertex
 *
 * Returns each vertex's degree from an adjacency matrix: its row sum.
 *
 * @see https://leetcode.com/problems/find-the-degree-of-each-vertex/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheDegreeOfEachVertex([[0, 1, 0], [1, 0, 0], [0, 0, 0]]); // [1, 1, 0]
 */
export const findTheDegreeOfEachVertex = (
	matrix: readonly (readonly number[])[],
): number[] => matrix.map((row) => row.reduce((a, b) => a + b, 0));

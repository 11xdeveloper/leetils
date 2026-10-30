/**
 * 2500. Delete Greatest Value in Each Row
 *
 * Repeatedly deletes each row's largest value and adds the largest of
 * those deleted to the answer, until the grid is empty.
 *
 * Sort each row; the `j`-th round deletes column `j`.
 *
 * @see https://leetcode.com/problems/delete-greatest-value-in-each-row/
 * @difficulty Easy
 * @timeComplexity O(m · n log n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * deleteGreatestValueInEachRow([[1, 2, 4], [3, 3, 1]]); // 8
 */
export const deleteGreatestValueInEachRow = (
	grid: readonly (readonly number[])[],
): number => {
	const sorted = grid.map((row) => row.toSorted((a, b) => a - b));
	let answer = 0;
	for (let c = 0; c < (sorted[0]?.length ?? 0); c++)
		answer += Math.max(...sorted.map((row) => row[c] ?? 0));
	return answer;
};

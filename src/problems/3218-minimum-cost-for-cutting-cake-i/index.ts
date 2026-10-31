/**
 * 3218. Minimum Cost for Cutting Cake I
 *
 * Cut an `m` × `n` cake into unit pieces. Each horizontal line i costs
 * `horizontalCut[i]` and each vertical line j costs `verticalCut[j]`, paid
 * once per piece the cut goes through. Returns the smallest total cost.
 *
 * Make the most expensive cuts first, while they cross the fewest pieces:
 * merge the two lists in decreasing order, each cut paying for the number
 * of strips the other direction has so far.
 *
 * @see https://leetcode.com/problems/minimum-cost-for-cutting-cake-i/
 * @difficulty Medium
 * @timeComplexity O(m log m + n log n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * minimumCostForCuttingCakeI(3, 2, [1, 3], [5]); // 13
 */
export const minimumCostForCuttingCakeI = (
	_m: number,
	_n: number,
	horizontalCut: readonly number[],
	verticalCut: readonly number[],
): number => {
	const rows = horizontalCut.toSorted((a, b) => b - a);
	const cols = verticalCut.toSorted((a, b) => b - a);
	let total = 0;
	let i = 0;
	let j = 0;
	while (i < rows.length || j < cols.length)
		if (
			j >= cols.length ||
			(i < rows.length && (rows[i] ?? 0) >= (cols[j] ?? 0))
		)
			total += (rows[i++] ?? 0) * (j + 1);
		else total += (cols[j++] ?? 0) * (i + 1);
	return total;
};

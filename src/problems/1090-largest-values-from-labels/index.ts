/**
 * 1090. Largest Values From Labels
 *
 * Item `i` has a value and a label. Chooses at most `numWanted` items, with
 * at most `useLimit` of any one label, to maximise the total value, and
 * returns that total.
 *
 * Greedy: take items from the most valuable down, skipping those whose
 * label is used up, until enough are taken.
 *
 * @see https://leetcode.com/problems/largest-values-from-labels/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestValuesFromLabels([5, 4, 3, 2, 1], [1, 1, 2, 2, 3], 3, 1); // 9
 */
export const largestValuesFromLabels = (
	values: readonly number[],
	labels: readonly number[],
	numWanted: number,
	useLimit: number,
): number => {
	const order = values
		.map((_, i) => i)
		.sort((a, b) => (values[b] ?? 0) - (values[a] ?? 0));
	const used = new Map<number, number>();
	let total = 0;
	let taken = 0;
	for (const i of order) {
		if (taken === numWanted) break;
		const label = labels[i] ?? 0;
		if ((used.get(label) ?? 0) >= useLimit) continue;
		used.set(label, (used.get(label) ?? 0) + 1);
		total += values[i] ?? 0;
		taken++;
	}
	return total;
};

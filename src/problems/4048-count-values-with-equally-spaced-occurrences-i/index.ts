/**
 * 4048. Count Values With Equally Spaced Occurrences I
 *
 * Counts the distinct values appearing exactly three times in `nums`, with all their
 * occurrences evenly spaced.
 *
 * @see https://leetcode.com/problems/count-values-with-equally-spaced-occurrences-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countValuesWithEquallySpacedOccurrencesI([1, 8, 1, 5, 1, 5, 8, 5]); // 2
 */
export const countValuesWithEquallySpacedOccurrencesI = (
	nums: readonly number[],
): number => {
	const positions = new Map<number, number[]>();
	nums.forEach((x, i) => {
		const list = positions.get(x) ?? [];
		list.push(i);
		positions.set(x, list);
	});
	let count = 0;
	for (const list of positions.values()) {
		if (!(list.length === 3)) continue;
		const step = (list[1] ?? 0) - (list[0] ?? 0);
		if (list.every((p, i) => i === 0 || p - (list[i - 1] ?? 0) === step))
			count++;
	}
	return count;
};

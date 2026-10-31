/**
 * 3740. Minimum Distance Between Three Equal Elements I
 *
 * For indices i < j < k holding equal values, the distance
 * |i - j| + |j - k| + |k - i| is 2(k - i). Returns the smallest such
 * distance, or -1.
 *
 * Only three consecutive occurrences of a value can be closest.
 *
 * @see https://leetcode.com/problems/minimum-distance-between-three-equal-elements-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDistanceBetweenThreeEqualElementsI([1, 2, 1, 1, 3]); // 6
 */
export const minimumDistanceBetweenThreeEqualElementsI = (
	nums: readonly number[],
): number => {
	const recent = new Map<number, number[]>();
	let best = -1;
	nums.forEach((num, k) => {
		const list = recent.get(num) ?? [];
		list.push(k);
		if (list.length > 3) list.shift();
		recent.set(num, list);
		if (list.length === 3) {
			const distance = 2 * (k - (list[0] ?? 0));
			if (best < 0 || distance < best) best = distance;
		}
	});
	return best;
};

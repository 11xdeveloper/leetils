/**
 * 1534. Count Good Triplets
 *
 * Counts the triples `i < j < k` with `|arr[i] − arr[j]| ≤ a`,
 * `|arr[j] − arr[k]| ≤ b` and `|arr[i] − arr[k]| ≤ c`.
 *
 * With at most 100 elements, checking every triple is quick; the inner
 * loop is skipped when the first condition already fails.
 *
 * @see https://leetcode.com/problems/count-good-triplets/
 * @difficulty Easy
 * @timeComplexity O(n^3)
 * @spaceComplexity O(1)
 *
 * @example
 * countGoodTriplets([3, 0, 1, 1, 9, 7], 7, 2, 3); // 4
 */
export const countGoodTriplets = (
	arr: readonly number[],
	a: number,
	b: number,
	c: number,
): number => {
	let count = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (Math.abs((arr[i] ?? 0) - (arr[j] ?? 0)) > a) continue;
			for (let k = j + 1; k < arr.length; k++) {
				if (
					Math.abs((arr[j] ?? 0) - (arr[k] ?? 0)) <= b &&
					Math.abs((arr[i] ?? 0) - (arr[k] ?? 0)) <= c
				)
					count++;
			}
		}
	}
	return count;
};

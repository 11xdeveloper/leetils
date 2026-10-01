/**
 * 1552. Magnetic Force Between Two Balls
 *
 * Places `m` balls in baskets at `position` to make the smallest gap between
 * two balls as large as possible, and returns that gap.
 *
 * Binary search on the gap: a gap is achievable when greedily placing each
 * ball in the first basket at least that far from the last fits `m` balls.
 *
 * @see https://leetcode.com/problems/magnetic-force-between-two-balls/
 * @difficulty Medium
 * @timeComplexity O(n log n + n log(range))
 * @spaceComplexity O(n)
 *
 * @example
 * magneticForceBetweenTwoBalls([1, 2, 3, 4, 7], 3); // 3
 */
export const magneticForceBetweenTwoBalls = (
	position: readonly number[],
	m: number,
): number => {
	const sorted = position.toSorted((a, b) => a - b);
	const fits = (gap: number) => {
		let [placed, last] = [1, sorted[0] ?? 0];
		for (const spot of sorted) {
			if (spot - last < gap) continue;
			placed++;
			last = spot;
		}
		return placed >= m;
	};
	let [low, high] = [1, (sorted.at(-1) ?? 0) - (sorted[0] ?? 0)];
	while (low < high) {
		const mid = Math.ceil((low + high) / 2);
		if (fits(mid)) low = mid;
		else high = mid - 1;
	}
	return low;
};

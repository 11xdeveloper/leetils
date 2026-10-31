/**
 * 2251. Number of Flowers in Full Bloom
 *
 * Flower `i` blooms from `flowers[i][0]` to `flowers[i][1]` inclusive.
 * Returns how many flowers are blooming when each person arrives.
 *
 * Blooming at `t` means started by `t` and not ended before `t`; binary
 * search sorted start and end times.
 *
 * @see https://leetcode.com/problems/number-of-flowers-in-full-bloom/
 * @difficulty Hard
 * @timeComplexity O((n + p) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfFlowersInFullBloom([[1, 6], [3, 7], [9, 12], [4, 13]], [2, 3, 7, 11]); // [1, 2, 2, 2]
 */
export const numberOfFlowersInFullBloom = (
	flowers: readonly (readonly number[])[],
	people: readonly number[],
): number[] => {
	const starts = flowers.map(([start = 0]) => start).sort((a, b) => a - b);
	const ends = flowers.map(([, end = 0]) => end).sort((a, b) => a - b);
	/** How many of the sorted `values` are below `bound`. */
	const below = (values: readonly number[], bound: number): number => {
		let [lo, hi] = [0, values.length];
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if ((values[mid] ?? 0) < bound) lo = mid + 1;
			else hi = mid;
		}
		return lo;
	};
	return people.map((t) => below(starts, t + 1) - below(ends, t));
};

/**
 * 1187. Make Array Strictly Increasing
 *
 * An operation replaces an element of `arr1` with any element of `arr2`.
 * Returns the fewest operations making `arr1` strictly increasing, or -1 if
 * that's impossible.
 *
 * Dynamic programming over the number of replacements: `last[j]` is the
 * smallest the latest element can be with exactly `j` replacements so far.
 * The next element either stays (if it's larger than `last[j]`) or is
 * replaced by the smallest value in `arr2` above `last[j − 1]`, found by
 * binary search.
 *
 * @see https://leetcode.com/problems/make-array-strictly-increasing/
 * @difficulty Hard
 * @timeComplexity O(m log m + n · min(n, m) · log m)
 * @spaceComplexity O(m + n)
 *
 * @example
 * makeArrayStrictlyIncreasing([1, 5, 3, 6, 7], [1, 3, 2, 4]); // 1
 */
export const makeArrayStrictlyIncreasing = (
	arr1: readonly number[],
	arr2: readonly number[],
): number => {
	const sorted = arr2.toSorted((a, b) => a - b);
	const smallestAbove = (value: number) => {
		let [low, high] = [0, sorted.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((sorted[mid] ?? 0) <= value) low = mid + 1;
			else high = mid;
		}
		return sorted[low] ?? Infinity;
	};
	const most = Math.min(arr1.length, sorted.length);
	let last = new Array<number>(most + 1).fill(Infinity);
	last[0] = -Infinity;
	for (const value of arr1) {
		const next = new Array<number>(most + 1).fill(Infinity);
		for (let j = 0; j <= most; j++) {
			if (value > (last[j] ?? Infinity)) next[j] = value;
			if (j > 0 && (last[j - 1] ?? Infinity) < Infinity) {
				next[j] = Math.min(
					next[j] ?? Infinity,
					smallestAbove(last[j - 1] ?? 0),
				);
			}
		}
		last = next;
	}
	return last.findIndex((value) => value < Infinity);
};

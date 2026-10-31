/**
 * 3413. Maximum Coins From K Consecutive Bags
 *
 * Non-overlapping segments `[l, r, c]` put c coins in every bag from l to
 * r on a number line. Returns the most coins in `k` consecutive bags.
 *
 * Some best window starts at a segment's left end or ends at a segment's
 * right end. Sweep windows starting at each left end with two pointers,
 * then do the same on the mirrored line for windows ending at right ends.
 *
 * @see https://leetcode.com/problems/maximum-coins-from-k-consecutive-bags/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumCoinsFromKConsecutiveBags([[8, 10, 1], [1, 3, 2], [5, 6, 4]], 4); // 10
 */
export const maximumCoinsFromKConsecutiveBags = (
	coins: readonly (readonly number[])[],
	k: number,
): number => {
	const sweep = (segments: [number, number, number][]): number => {
		segments.sort((a, b) => a[0] - b[0]);
		let best = 0;
		let sum = 0;
		for (let i = 0, j = 0; i < segments.length; i++) {
			const start = segments[i]?.[0] ?? 0;
			const end = start + k - 1;
			while (j < segments.length && (segments[j]?.[1] ?? 0) <= end) {
				const [l = 0, r = 0, c = 0] = segments[j] ?? [];
				sum += (r - l + 1) * c;
				j++;
			}
			let partial = 0;
			const next = segments[j];
			if (next && next[0] <= end) partial = (end - next[0] + 1) * next[2];
			best = Math.max(best, sum + partial);
			const [l = 0, r = 0, c = 0] = segments[i] ?? [];
			if (j > i) sum -= (r - l + 1) * c;
			else j = i + 1;
		}
		return best;
	};
	return Math.max(
		sweep(coins.map(([l = 0, r = 0, c = 0]) => [l, r, c])),
		sweep(coins.map(([l = 0, r = 0, c = 0]) => [-r, -l, c])),
	);
};

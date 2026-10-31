/**
 * 3639. Minimum Time to Activate String
 *
 * At time t, character `order[t]` of `s` becomes `*`. The string is active
 * once at least `k` of its substrings contain a `*`. Returns the earliest
 * time it's active, or -1.
 *
 * Binary search the time: substrings with a star are all substrings minus
 * those inside the star-free gaps.
 *
 * @see https://leetcode.com/problems/minimum-time-to-activate-string/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTimeToActivateString("cat", [0, 2, 1], 6); // 2
 */
export const minimumTimeToActivateString = (
	s: string,
	order: readonly number[],
	k: number,
): number => {
	const n = s.length;
	// starredAt[i]: when position i gets its star.
	const starredAt = new Int32Array(n);
	order.forEach((position, t) => {
		starredAt[position] = t;
	});
	const active = (t: number): boolean => {
		let count = (n * (n + 1)) / 2;
		let gap = 0;
		for (let i = 0; i <= n; i++) {
			if (i < n && (starredAt[i] ?? 0) > t) gap++;
			else {
				count -= (gap * (gap + 1)) / 2;
				gap = 0;
			}
		}
		return count >= k;
	};
	if (!active(n - 1)) return -1;
	let [lo, hi] = [0, n - 1];
	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		if (active(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};

/**
 * 3357. Minimize the Maximum Adjacent Element Difference
 *
 * Choose a pair of positive integers (x, y) and replace every -1 in `nums`
 * with x or y. Returns the smallest possible largest difference between
 * neighbours.
 *
 * Binary search on the answer d. Let lo and hi be the smallest and largest
 * known values next to a gap; the best choices are x = lo + d and
 * y = hi - d. A gap between known values a and b then works if one value
 * stays within d of both, or, for a gap of two or more, if x and y can be
 * chained a → x → y → b (or the other way) within d.
 *
 * @see https://leetcode.com/problems/minimize-the-maximum-adjacent-element-difference/
 * @difficulty Hard
 * @timeComplexity O(n log max)
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeTheMaximumAdjacentElementDifference([1, 2, -1, 10, 8]); // 4
 */
export const minimizeTheMaximumAdjacentElementDifference = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	let base = 0;
	let lo = Number.POSITIVE_INFINITY;
	let hi = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < n; i++) {
		const v = nums[i] ?? 0;
		if (v === -1) continue;
		const left = nums[i - 1];
		const right = nums[i + 1];
		if (left !== undefined && left !== -1)
			base = Math.max(base, Math.abs(v - left));
		if (left === -1 || right === -1) {
			lo = Math.min(lo, v);
			hi = Math.max(hi, v);
		}
	}
	if (lo === Number.POSITIVE_INFINITY) return base;
	// Gaps of -1s as [known before or undefined, known after or undefined, length].
	const gaps: [number | undefined, number | undefined, number][] = [];
	for (let i = 0; i < n; ) {
		if (nums[i] !== -1) {
			i++;
			continue;
		}
		let j = i;
		while (j < n && nums[j] === -1) j++;
		gaps.push([nums[i - 1], nums[j], j - i]);
		i = j;
	}
	const fits = (d: number): boolean => {
		const x = lo + d;
		const y = hi - d;
		const near = (a: number | undefined, v: number): boolean =>
			a === undefined || Math.abs(a - v) <= d;
		return gaps.every(
			([a, b, length]) =>
				[x, y].some((v) => near(a, v) && near(b, v)) ||
				(length >= 2 &&
					Math.abs(x - y) <= d &&
					((near(a, x) && near(b, y)) || (near(a, y) && near(b, x)))),
		);
	};
	let low = base;
	let high = Math.max(base, hi - lo);
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (fits(mid)) high = mid;
		else low = mid + 1;
	}
	return low;
};

/**
 * 3956. Maximum Sum of M Non-Overlapping Subarrays I
 *
 * Choose between 1 and `m` non-overlapping subarrays, each of length `l`
 * to `r`, maximising their total. Returns that total.
 *
 * Dynamic programming by subarrays used and prefix length. A new subarray
 * ending at i starts somewhere in a window of positions, and the best
 * start is a sliding-window maximum of (previous best - prefix sum).
 *
 * @see https://leetcode.com/problems/maximum-sum-of-m-non-overlapping-subarrays-i/
 * @difficulty Hard
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSumOfMNonOverlappingSubarraysI([4, 1, -5, 2], 2, 1, 3); // 7
 */
export const maximumSumOfMNonOverlappingSubarraysI = (
	nums: readonly number[],
	m: number,
	l: number,
	r: number,
): number => {
	const n = nums.length;
	const NONE = Number.NEGATIVE_INFINITY;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	// best[i]: best total within the first i elements using the subarrays so far (none: 0).
	let best = new Array<number>(n + 1).fill(0);
	let answer = NONE;
	for (let used = 1; used <= m; used++) {
		// exact[i]: best with `used` subarrays (at least one) in the first i elements.
		const exact = new Array<number>(n + 1).fill(NONE);
		const window: number[] = [];
		let head = 0;
		for (let i = 1; i <= n; i++) {
			const enter = i - l;
			if (enter >= 0) {
				const value = (best[enter] ?? NONE) - (prefix[enter] ?? 0);
				while (
					window.length > head &&
					(best[window.at(-1) ?? 0] ?? NONE) -
						(prefix[window.at(-1) ?? 0] ?? 0) <=
						value
				)
					window.pop();
				window.push(enter);
			}
			while (window.length > head && (window[head] ?? 0) < i - r) head++;
			const start = window[head];
			const ending =
				start === undefined
					? NONE
					: (best[start] ?? NONE) - (prefix[start] ?? 0) + (prefix[i] ?? 0);
			exact[i] = Math.max(exact[i - 1] ?? NONE, ending);
		}
		answer = Math.max(answer, exact[n] ?? NONE);
		best = exact;
	}
	return answer;
};

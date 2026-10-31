/**
 * 3900. Longest Balanced Substring After One Swap
 *
 * After at most one swap of two characters of the binary string `s`,
 * returns the longest substring with as many 0s as 1s.
 *
 * A swap with a character outside a substring changes its balance by 2.
 * So a substring works if its balance (1s minus 0s) is 0, or +2 with a 0
 * outside it, or -2 with a 1 outside. Those outside-character conditions
 * cap the length, so for each end look up, by prefix balance, the
 * earliest start within the cap.
 *
 * @see https://leetcode.com/problems/longest-balanced-substring-after-one-swap/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestBalancedSubstringAfterOneSwap("100001"); // 4
 */
export const longestBalancedSubstringAfterOneSwap = (s: string): number => {
	const n = s.length;
	let ones = 0;
	for (const c of s) if (c === "1") ones++;
	const zeros = n - ones;
	// positions.get(b): prefix indices with balance b, increasing.
	const positions = new Map<number, number[]>();
	const record = (balance: number, index: number) => {
		const list = positions.get(balance) ?? [];
		list.push(index);
		positions.set(balance, list);
	};
	/** Earliest prefix index with this balance at or after `from`. */
	const earliest = (balance: number, from: number): number => {
		const list = positions.get(balance) ?? [];
		let [lo, hi] = [0, list.length];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((list[mid] ?? 0) < from) lo = mid + 1;
			else hi = mid;
		}
		return list[lo] ?? -1;
	};
	let best = 0;
	let balance = 0;
	record(0, 0);
	for (let end = 1; end <= n; end++) {
		balance += s[end - 1] === "1" ? 1 : -1;
		const options: [shift: number, cap: number][] = [
			[0, n],
			[2, 2 * zeros],
			[-2, 2 * ones],
		];
		for (const [shift, cap] of options) {
			const start = earliest(balance - shift, Math.max(0, end - cap));
			if (start >= 0 && start < end) best = Math.max(best, end - start);
		}
		record(balance, end);
	}
	return best;
};

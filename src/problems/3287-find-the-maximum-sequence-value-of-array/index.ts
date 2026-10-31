/**
 * 3287. Find the Maximum Sequence Value of Array
 *
 * Pick a subsequence of `nums` of length 2k. Its value is the OR of its
 * first k elements XOR the OR of its last k. Returns the largest value.
 *
 * Values are below 2⁷, so ORs take at most 128 values. For each prefix,
 * work out which ORs some k of its elements can make, and the same for
 * each suffix, then try every split point and pair of ORs.
 *
 * @see https://leetcode.com/problems/find-the-maximum-sequence-value-of-array/
 * @difficulty Hard
 * @timeComplexity O(n · k · 128 + n · 128²)
 * @spaceComplexity O(n · 128 + k · 128)
 *
 * @example
 * findTheMaximumSequenceValueOfArray([2, 6, 7], 1); // 5
 */
export const findTheMaximumSequenceValueOfArray = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	/** For each prefix length, the ORs achievable with exactly k of its elements. */
	const reachable = (values: readonly number[]): Uint8Array[] => {
		const ways = Array.from({ length: k + 1 }, () => new Uint8Array(128));
		const first = ways[0];
		if (first) first[0] = 1;
		const result: Uint8Array[] = [Uint8Array.from(ways[k] ?? [])];
		for (const value of values) {
			for (let count = Math.min(k, result.length); count >= 1; count--) {
				const from = ways[count - 1];
				const to = ways[count];
				if (!from || !to) continue;
				for (let or = 0; or < 128; or++) if (from[or]) to[or | value] = 1;
			}
			result.push(Uint8Array.from(ways[k] ?? []));
		}
		return result;
	};
	const prefix = reachable(nums);
	const suffix = reachable(nums.toReversed());
	let best = 0;
	for (let split = k; split + k <= n; split++) {
		const left = prefix[split];
		const right = suffix[n - split];
		if (!left || !right) continue;
		for (let a = 0; a < 128; a++) {
			if (!left[a]) continue;
			for (let b = 0; b < 128; b++) if (right[b]) best = Math.max(best, a ^ b);
		}
	}
	return best;
};

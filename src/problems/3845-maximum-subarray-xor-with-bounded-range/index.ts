/**
 * 3845. Maximum Subarray XOR with Bounded Range
 *
 * Among subarrays whose maximum and minimum differ by at most `k`,
 * returns the largest XOR.
 *
 * For each right end, the valid left ends form a window that only moves
 * right (monotonic deques give the max and min). A subarray's XOR is two
 * prefix XORs combined, so keep the window's prefixes in a binary trie
 * with counts, supporting removal, and greedily pick the best partner.
 *
 * @see https://leetcode.com/problems/maximum-subarray-xor-with-bounded-range/
 * @difficulty Hard
 * @timeComplexity O(n · B), for B = 15 bits
 * @spaceComplexity O(n · B)
 *
 * @example
 * maximumSubarrayXorWithBoundedRange([5, 4, 5, 6], 2); // 7
 */
export const maximumSubarrayXorWithBoundedRange = (
	nums: readonly number[],
	k: number,
): number => {
	const BITS = 15;
	const n = nums.length;
	const child = new Int32Array(2 * (n + 1) * (BITS + 1) + 2);
	const count = new Int32Array((n + 1) * (BITS + 1) + 1);
	let nodes = 1;
	const change = (value: number, delta: number): void => {
		let node = 0;
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const b = (value >> bit) & 1;
			if (!child[2 * node + b]) child[2 * node + b] = nodes++;
			node = child[2 * node + b] ?? 0;
			count[node] = (count[node] ?? 0) + delta;
		}
	};
	const bestPartner = (value: number): number => {
		let [node, result] = [0, 0];
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const want = 1 - ((value >> bit) & 1);
			const next = child[2 * node + want] ?? 0;
			if (next && (count[next] ?? 0) > 0) {
				result |= 1 << bit;
				node = next;
			} else node = child[2 * node + (1 - want)] ?? 0;
		}
		return result;
	};
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) ^ num);
	const highs: number[] = [];
	const lows: number[] = [];
	let [highHead, lowHead, left, best] = [0, 0, 0, 0];
	nums.forEach((value, right) => {
		change(prefix[right] ?? 0, 1);
		while (highs.length > highHead && (nums[highs.at(-1) ?? 0] ?? 0) <= value)
			highs.pop();
		highs.push(right);
		while (lows.length > lowHead && (nums[lows.at(-1) ?? 0] ?? 0) >= value)
			lows.pop();
		lows.push(right);
		while (
			(nums[highs[highHead] ?? 0] ?? 0) - (nums[lows[lowHead] ?? 0] ?? 0) >
			k
		) {
			change(prefix[left] ?? 0, -1);
			left++;
			if ((highs[highHead] ?? 0) < left) highHead++;
			if ((lows[lowHead] ?? 0) < left) lowHead++;
		}
		best = Math.max(best, bestPartner(prefix[right + 1] ?? 0));
	});
	return best;
};

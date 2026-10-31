/**
 * 3886. Sum of Sortable Integers
 *
 * A divisor k of n is sortable if cutting `nums` into blocks of length k
 * and rotating each block can sort it. Returns the sum of sortable k.
 *
 * A block can be rotated into order when, read cyclically, it decreases
 * at most once; then the blocks must also fit together, each one's
 * largest at most the next one's smallest. Check every divisor.
 *
 * @see https://leetcode.com/problems/sum-of-sortable-integers/
 * @difficulty Hard
 * @timeComplexity O(n · d(n))
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfSortableIntegers([3, 1, 2]); // 3
 */
export const sumOfSortableIntegers = (nums: readonly number[]): number => {
	const n = nums.length;
	let total = 0;
	for (let k = 1; k <= n; k++) {
		if (n % k !== 0) continue;
		let ok = true;
		let previousHigh = Number.NEGATIVE_INFINITY;
		for (let start = 0; start < n && ok; start += k) {
			let [drops, low, high] = [
				0,
				Number.POSITIVE_INFINITY,
				Number.NEGATIVE_INFINITY,
			];
			for (let i = 0; i < k; i++) {
				const value = nums[start + i] ?? 0;
				if (value > (nums[start + ((i + 1) % k)] ?? 0)) drops++;
				low = Math.min(low, value);
				high = Math.max(high, value);
			}
			if (drops > 1 || low < previousHigh) ok = false;
			previousHigh = high;
		}
		if (ok) total += k;
	}
	return total;
};

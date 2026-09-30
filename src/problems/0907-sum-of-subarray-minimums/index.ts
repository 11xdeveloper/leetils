/**
 * 907. Sum of Subarray Minimums
 *
 * Returns the sum of the minimums of every subarray of `arr`, modulo
 * 10^9 + 7.
 *
 * Each element is the minimum of the subarrays reaching left until a
 * smaller element and right until a smaller-or-equal one (so ties are
 * counted once). A monotonic stack finds those bounds, and the element
 * contributes its value times the number of such subarrays.
 *
 * @see https://leetcode.com/problems/sum-of-subarray-minimums/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfSubarrayMinimums([3, 1, 2, 4]); // 17
 */
export const sumOfSubarrayMinimums = (arr: readonly number[]): number => {
	const MOD = 1_000_000_007;
	const n = arr.length;
	const stack: number[] = [];
	let total = 0;
	for (let i = 0; i <= n; i++) {
		const value = i < n ? (arr[i] ?? 0) : Number.NEGATIVE_INFINITY;
		while (stack.length > 0 && (arr[stack.at(-1) ?? 0] ?? 0) >= value) {
			const middle = stack.pop() ?? 0;
			const left = stack.at(-1) ?? -1;
			total =
				(total +
					(arr[middle] ?? 0) * (((middle - left) * (i - middle)) % MOD)) %
				MOD;
		}
		stack.push(i);
	}
	return total;
};

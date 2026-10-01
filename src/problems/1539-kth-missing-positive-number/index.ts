/**
 * 1539. Kth Missing Positive Number
 *
 * Returns the `k`th positive integer missing from the strictly increasing
 * `arr`.
 *
 * Before `arr[i]`, exactly `arr[i] − i − 1` numbers are missing. Binary
 * search for how many elements come before the answer; the answer is then
 * `k` plus that count.
 *
 * @see https://leetcode.com/problems/kth-missing-positive-number/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * kthMissingPositiveNumber([2, 3, 4, 7, 11], 5); // 9
 */
export const kthMissingPositiveNumber = (
	arr: readonly number[],
	k: number,
): number => {
	let [low, high] = [0, arr.length];
	while (low < high) {
		const mid = (low + high) >>> 1;
		if ((arr[mid] ?? 0) - mid - 1 < k) low = mid + 1;
		else high = mid;
	}
	return low + k;
};

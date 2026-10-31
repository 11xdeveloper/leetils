/**
 * 2763. Sum of Imbalance Numbers of All Subarrays
 *
 * A subarray's imbalance is how many neighbouring pairs in its sorted
 * order differ by more than 1. Returns the total over all subarrays.
 *
 * Extend each start rightwards with a set of values seen. A new value
 * opens a gap unless it touches a neighbour already present, and closes
 * one for each neighbour it bridges.
 *
 * @see https://leetcode.com/problems/sum-of-imbalance-numbers-of-all-subarrays/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfImbalanceNumbersOfAllSubarrays([2, 3, 1, 4]); // 3
 */
export const sumOfImbalanceNumbersOfAllSubarrays = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	let total = 0;
	for (let start = 0; start < n; start++) {
		const seen = new Uint8Array(n + 2);
		let imbalance = -1;
		for (let end = start; end < n; end++) {
			const x = nums[end] ?? 0;
			if (!seen[x]) {
				imbalance += 1 - (seen[x - 1] ?? 0) - (seen[x + 1] ?? 0);
				seen[x] = 1;
			}
			total += imbalance;
		}
	}
	return total;
};

/**
 * 3685. Subsequence Sum After Capping Elements
 *
 * For each x from 1 to n, cap every element of `nums` at x. Returns
 * whether some subsequence then sums to exactly `k`, for each x.
 *
 * Sort the values and raise x: values below x enter a subset-sum table as
 * they are, and the c values at least x are interchangeable copies of x,
 * so check k - j · x in the table for each j up to c.
 *
 * @see https://leetcode.com/problems/subsequence-sum-after-capping-elements/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * subsequenceSumAfterCappingElements([4, 3, 2, 4], 5); // [false, false, true, true]
 */
export const subsequenceSumAfterCappingElements = (
	nums: readonly number[],
	k: number,
): boolean[] => {
	const n = nums.length;
	const sorted = [...nums].sort((a, b) => a - b);
	const reachable = new Uint8Array(k + 1);
	reachable[0] = 1;
	let used = 0;
	const answer: boolean[] = [];
	for (let x = 1; x <= n; x++) {
		while (used < n && (sorted[used] ?? 0) < x) {
			const value = sorted[used++] ?? 0;
			for (let s = k; s >= value; s--)
				if (reachable[s - value]) reachable[s] = 1;
		}
		let found = false;
		for (let j = 0; j <= n - used && j * x <= k && !found; j++)
			if (reachable[k - j * x]) found = true;
		answer.push(found);
	}
	return answer;
};

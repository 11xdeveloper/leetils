/**
 * 3048. Earliest Second to Mark Indices I
 *
 * In second s (from 1), you may decrement any element of `nums`, mark the
 * index `changeIndices[s - 1]` (1-indexed) if its value is 0, or do
 * nothing. Returns the earliest second by which every index can be marked,
 * or -1.
 *
 * Binary search on the deadline. By a deadline, mark each index at its last
 * occurrence, which is latest and so leaves the most time to decrement it.
 * Walking forward, other seconds bank a decrement, and each marking second
 * spends the index's decrements from the bank.
 *
 * @see https://leetcode.com/problems/earliest-second-to-mark-indices-i/
 * @difficulty Medium
 * @timeComplexity O(m log m)
 * @spaceComplexity O(n)
 *
 * @example
 * earliestSecondToMarkIndicesI([2, 2, 0], [2, 2, 2, 2, 3, 2, 2, 1]); // 8
 */
export const earliestSecondToMarkIndicesI = (
	nums: readonly number[],
	changeIndices: readonly number[],
): number => {
	const n = nums.length;
	const canFinishBy = (deadline: number): boolean => {
		const last = new Int32Array(n + 1).fill(-1);
		for (let s = 0; s < deadline; s++) last[changeIndices[s] ?? 0] = s;
		let bank = 0;
		let marked = 0;
		for (let s = 0; s < deadline; s++) {
			const index = changeIndices[s] ?? 0;
			if (last[index] !== s) bank++;
			else {
				bank -= nums[index - 1] ?? 0;
				if (bank < 0) return false;
				marked++;
			}
		}
		return marked === n;
	};
	let lo = 1;
	let hi = changeIndices.length + 1;
	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		if (canFinishBy(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo > changeIndices.length ? -1 : lo;
};

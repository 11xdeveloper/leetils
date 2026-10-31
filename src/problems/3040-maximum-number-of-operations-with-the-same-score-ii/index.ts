/**
 * 3040. Maximum Number of Operations With the Same Score II
 *
 * Repeatedly remove the first two, the last two, or the first and last
 * elements of `nums`, scoring their sum. Returns the most removals possible
 * while every score is the same.
 *
 * The first removal fixes the score to one of three sums. For each, fill in
 * the most removals from every subarray by interval dynamic programming,
 * shortest first, since each removal leaves a subarray two shorter.
 *
 * @see https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-ii/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * maximumNumberOfOperationsWithTheSameScoreII([3, 2, 1, 2, 3, 4]); // 3
 */
export const maximumNumberOfOperationsWithTheSameScoreII = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const at = (i: number): number => nums[i] ?? 0;
	const best = new Int16Array(n * n);
	const get = (l: number, r: number): number =>
		l < r ? (best[l * n + r] ?? 0) : 0;
	let answer = 0;
	for (const score of new Set([
		at(0) + at(1),
		at(n - 2) + at(n - 1),
		at(0) + at(n - 1),
	])) {
		for (let length = 2; length <= n; length++)
			for (let l = 0; l + length <= n; l++) {
				const r = l + length - 1;
				let value = 0;
				if (at(l) + at(l + 1) === score)
					value = Math.max(value, 1 + get(l + 2, r));
				if (at(r - 1) + at(r) === score)
					value = Math.max(value, 1 + get(l, r - 2));
				if (at(l) + at(r) === score)
					value = Math.max(value, 1 + get(l + 1, r - 1));
				best[l * n + r] = value;
			}
		answer = Math.max(answer, get(0, n - 1));
	}
	return answer;
};

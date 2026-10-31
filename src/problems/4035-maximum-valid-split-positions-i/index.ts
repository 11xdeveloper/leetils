/**
 * 4035. Maximum Valid Split Positions I
 *
 * After removing at most one element, a split position is valid when the
 * gcd of the part before it equals the gcd of the part after. Returns the
 * most valid split positions possible.
 *
 * Try every removal (and none), counting splits with prefix and suffix
 * gcds.
 *
 * @see https://leetcode.com/problems/maximum-valid-split-positions-i/
 * @difficulty Medium
 * @timeComplexity O(n² log V)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumValidSplitPositionsI([10, 30, 15, 10]); // 2
 */
export const maximumValidSplitPositionsI = (
	nums: readonly number[],
): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const score = (arr: readonly number[]): number => {
		const m = arr.length;
		const suffix = new Array<number>(m + 1).fill(0);
		for (let i = m - 1; i >= 0; i--)
			suffix[i] = gcd(suffix[i + 1] ?? 0, arr[i] ?? 0);
		let [count, prefix] = [0, 0];
		for (let i = 0; i + 1 < m; i++) {
			prefix = gcd(prefix, arr[i] ?? 0);
			if (prefix === suffix[i + 1]) count++;
		}
		return count;
	};
	let best = score(nums);
	for (let skip = 0; skip < nums.length; skip++)
		best = Math.max(best, score(nums.filter((_, i) => i !== skip)));
	return best;
};

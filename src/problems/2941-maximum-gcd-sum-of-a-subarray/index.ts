/**
 * 2941. Maximum GCD-Sum of a Subarray
 *
 * A subarray's gcd-sum is its gcd times its sum. Returns the largest
 * gcd-sum over subarrays of at least `k` elements.
 *
 * Subarrays ending at a given index have only O(log m) distinct gcds,
 * each best paired with its earliest start. Carry that list along,
 * merging equal gcds, and price each with prefix sums. Products can pass
 * 2⁵³, so compare them as BigInt.
 *
 * @see https://leetcode.com/problems/maximum-gcd-sum-of-a-subarray/
 * @difficulty Hard
 * @timeComplexity O(n log² m), where `m` is the largest value
 * @spaceComplexity O(n + log m)
 *
 * @example
 * maximumGcdSumOfASubarray([2, 1, 4, 4, 4, 2], 2); // 48
 */
export const maximumGcdSumOfASubarray = (
	nums: readonly number[],
	k: number,
): number => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);

	let groups: [g: number, start: number][] = [];
	let best = 0n;
	for (const [end, num] of nums.entries()) {
		const next: [number, number][] = [];
		for (const [g, start] of [...groups, [num, end] as [number, number]]) {
			const merged = gcd(g, num);
			if (next.at(-1)?.[0] !== merged) next.push([merged, start]);
		}
		groups = next;
		for (const [g, start] of groups)
			if (end - start + 1 >= k) {
				const value =
					BigInt(g) * BigInt((prefix[end + 1] ?? 0) - (prefix[start] ?? 0));
				if (value > best) best = value;
			}
	}
	return Number(best);
};

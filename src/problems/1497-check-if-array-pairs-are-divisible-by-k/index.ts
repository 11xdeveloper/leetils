/**
 * 1497. Check If Array Pairs Are Divisible by k
 *
 * Returns whether the even-length `arr` can be split into pairs whose sums
 * are all divisible by `k`.
 *
 * A pair works when its remainders mod `k` add to 0 or `k`. So values with
 * remainder `r` must be matched one-for-one with remainder `k − r`, and
 * remainder 0 (and `k / 2`) must pair among themselves, needing an even
 * count.
 *
 * @see https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/
 * @difficulty Medium
 * @timeComplexity O(n + k)
 * @spaceComplexity O(k)
 *
 * @example
 * checkIfArrayPairsAreDivisibleByK([1, 2, 3, 4, 5, 10, 6, 7, 8, 9], 5); // true
 */
export const checkIfArrayPairsAreDivisibleByK = (
	arr: readonly number[],
	k: number,
): boolean => {
	const counts = new Array<number>(k).fill(0);
	for (const value of arr) {
		const r = ((value % k) + k) % k;
		counts[r] = (counts[r] ?? 0) + 1;
	}
	if ((counts[0] ?? 0) % 2 !== 0) return false;
	for (let r = 1; r < k; r++) {
		if ((counts[r] ?? 0) !== (counts[k - r] ?? 0)) return false;
	}
	return k % 2 !== 0 || (counts[k / 2] ?? 0) % 2 === 0;
};

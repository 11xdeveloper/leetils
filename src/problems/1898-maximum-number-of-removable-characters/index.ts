/**
 * 1898. Maximum Number of Removable Characters
 *
 * Returns the largest `k` such that removing the characters of `s` at
 * `removable[0 … k − 1]` leaves `p` a subsequence of it.
 *
 * Removing more never helps, so binary search `k`, checking the
 * subsequence with two pointers and the removal times.
 *
 * @see https://leetcode.com/problems/maximum-number-of-removable-characters/
 * @difficulty Medium
 * @timeComplexity O(n log r)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfRemovableCharacters("abcacb", "ab", [3, 1, 0]); // 2
 */
export const maximumNumberOfRemovableCharacters = (
	s: string,
	p: string,
	removable: readonly number[],
): number => {
	// removedAt[i]: how many removals it takes for index i to be removed.
	const removedAt = new Array<number>(s.length).fill(Infinity);
	for (const [k, index] of removable.entries()) removedAt[index] = k + 1;
	const stillSubsequence = (k: number) => {
		let matched = 0;
		for (let i = 0; i < s.length && matched < p.length; i++) {
			if ((removedAt[i] ?? Infinity) > k && s[i] === p[matched]) matched++;
		}
		return matched === p.length;
	};
	let [low, high] = [0, removable.length];
	while (low < high) {
		const k = Math.ceil((low + high) / 2);
		if (stillSubsequence(k)) low = k;
		else high = k - 1;
	}
	return low;
};

/**
 * 3137. Minimum Number of Operations to Make Word K-Periodic
 *
 * Each operation copies one length-`k` block of `word` (at a multiple of
 * `k`) over another. Returns the fewest operations to make every block the
 * same.
 *
 * Keep the most common block and overwrite the others.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-make-word-k-periodic/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfOperationsToMakeWordKPeriodic("leetcodeleet", 4); // 1
 */
export const minimumNumberOfOperationsToMakeWordKPeriodic = (
	word: string,
	k: number,
): number => {
	const counts = new Map<string, number>();
	let most = 0;
	for (let i = 0; i < word.length; i += k) {
		const block = word.slice(i, i + k);
		const count = (counts.get(block) ?? 0) + 1;
		counts.set(block, count);
		most = Math.max(most, count);
	}
	return word.length / k - most;
};

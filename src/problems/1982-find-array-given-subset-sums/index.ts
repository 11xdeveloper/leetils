/**
 * 1982. Find Array Given Subset Sums
 *
 * Given all `2^n` subset sums of an unknown array (in any order), returns
 * any array of length `n` with exactly those subset sums.
 *
 * The gap `d` between the two smallest sums is the absolute value of some
 * element. Pair each sum with the sum `d` larger to split the multiset
 * into subsets without and with that element; if the half without it
 * contains 0 the element is `d`, otherwise it's `−d` and the other half
 * continues. Repeat on the half that remains.
 *
 * @see https://leetcode.com/problems/find-array-given-subset-sums/
 * @difficulty Hard
 * @timeComplexity O(n · 2^n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * findArrayGivenSubsetSums(3, [-3, -2, -1, 0, 0, 1, 2, 3]); // [1, 2, -3]
 */
export const findArrayGivenSubsetSums = (
	n: number,
	sums: readonly number[],
): number[] => {
	let current = sums.toSorted((a, b) => a - b);
	const answer: number[] = [];
	for (let step = 0; step < n; step++) {
		const d = (current[1] ?? 0) - (current[0] ?? 0);
		const without: number[] = [];
		const withIt: number[] = [];
		const pending = new Map<number, number>();
		for (const sum of current) {
			const waiting = pending.get(sum) ?? 0;
			if (waiting > 0) {
				pending.set(sum, waiting - 1);
				withIt.push(sum);
			} else {
				without.push(sum);
				pending.set(sum + d, (pending.get(sum + d) ?? 0) + 1);
			}
		}
		if (without.includes(0)) {
			answer.push(d);
			current = without;
		} else {
			answer.push(-d);
			current = withIt;
		}
	}
	return answer;
};

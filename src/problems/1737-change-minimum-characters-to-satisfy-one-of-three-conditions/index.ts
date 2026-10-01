/**
 * 1737. Change Minimum Characters to Satisfy One of Three Conditions
 *
 * Returns the fewest character changes to `a` and `b` so that every
 * letter of `a` is below every letter of `b`, or the reverse, or both use
 * a single shared letter.
 *
 * With letter counts, try each boundary letter for the first two goals
 * (everything in one string below it, everything in the other at or
 * above it), and each letter for the third.
 *
 * @see https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * changeMinimumCharactersToSatisfyOneOfThreeConditions("dabadd", "cda"); // 3
 */
export const changeMinimumCharactersToSatisfyOneOfThreeConditions = (
	a: string,
	b: string,
): number => {
	const countsOf = (s: string) => {
		const counts = new Array<number>(26).fill(0);
		for (let i = 0; i < s.length; i++)
			counts[s.charCodeAt(i) - 97] = (counts[s.charCodeAt(i) - 97] ?? 0) + 1;
		return counts;
	};
	const [countA, countB] = [countsOf(a), countsOf(b)];
	let best = Infinity;
	for (let letter = 0; letter < 26; letter++) {
		best = Math.min(
			best,
			a.length + b.length - (countA[letter] ?? 0) - (countB[letter] ?? 0),
		);
	}
	// Boundary letter: one string must be below it and the other at or above it.
	let [aBelow, bBelow] = [0, 0];
	for (let boundary = 1; boundary < 26; boundary++) {
		aBelow += countA[boundary - 1] ?? 0;
		bBelow += countB[boundary - 1] ?? 0;
		best = Math.min(
			best,
			a.length - aBelow + bBelow,
			b.length - bBelow + aBelow,
		);
	}
	return best;
};

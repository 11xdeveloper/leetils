const MOD = 1_000_000_007;

/**
 * 3335. Total Characters in String After Transformations I
 *
 * Each transformation turns 'z' into "ab" and every other letter into the
 * next one. Returns the length after `t` transformations, modulo 10⁹ + 7.
 *
 * Only the letter counts matter: shift them along each step, with the
 * 'z's feeding both 'a' and 'b'.
 *
 * @see https://leetcode.com/problems/total-characters-in-string-after-transformations-i/
 * @difficulty Medium
 * @timeComplexity O(n + 26 t)
 * @spaceComplexity O(1)
 *
 * @example
 * totalCharactersInStringAfterTransformationsI("abcyy", 2); // 7
 */
export const totalCharactersInStringAfterTransformationsI = (
	s: string,
	t: number,
): number => {
	let counts = new Array<number>(26).fill(0);
	for (let i = 0; i < s.length; i++)
		counts[s.charCodeAt(i) - 97] = (counts[s.charCodeAt(i) - 97] ?? 0) + 1;
	for (let step = 0; step < t; step++) {
		const z = counts[25] ?? 0;
		counts = [z, ((counts[0] ?? 0) + z) % MOD, ...counts.slice(1, 25)];
	}
	return counts.reduce((total, count) => (total + count) % MOD, 0);
};

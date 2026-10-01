/**
 * 1554. Strings Differ by One Character
 *
 * Returns whether two of the distinct, equal-length strings in `dict`
 * differ in exactly one position.
 *
 * Two strings differ only at position `i` when they're equal with that
 * position blanked out. Rolling hashes give each blanked string in
 * constant time; strings whose blanked hashes match are compared directly
 * to rule out collisions.
 *
 * @see https://leetcode.com/problems/strings-differ-by-one-character/
 * @difficulty Medium
 * @timeComplexity O(n · m) for n strings of length m, expected
 * @spaceComplexity O(n)
 *
 * @example
 * stringsDifferByOneCharacter(["abcd", "acbd", "aacd"]); // true
 */
export const stringsDifferByOneCharacter = (
	dict: readonly string[],
): boolean => {
	const MOD = 1_000_000_007;
	const m = dict[0]?.length ?? 0;
	const powers = [1];
	for (let i = 1; i < m; i++) powers.push(((powers[i - 1] ?? 1) * 27) % MOD);
	const hashes = dict.map((word) => {
		let hash = 0;
		for (let i = 0; i < m; i++)
			hash = (hash * 27 + word.charCodeAt(i) - 96) % MOD;
		return hash;
	});
	const sameExcept = (a: string, b: string, skip: number) => {
		for (let i = 0; i < m; i++) if (i !== skip && a[i] !== b[i]) return false;
		return true;
	};
	for (let position = 0; position < m; position++) {
		const seen = new Map<number, number[]>();
		const power = powers[m - 1 - position] ?? 1;
		for (const [index, word] of dict.entries()) {
			const value = word.charCodeAt(position) - 96;
			const blanked =
				((hashes[index] ?? 0) - ((value * power) % MOD) + MOD) % MOD;
			const matches = seen.get(blanked) ?? [];
			if (
				matches.some((other) => sameExcept(word, dict[other] ?? "", position))
			)
				return true;
			matches.push(index);
			seen.set(blanked, matches);
		}
	}
	return false;
};

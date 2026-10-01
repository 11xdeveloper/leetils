/**
 * 1061. Lexicographically Smallest Equivalent String
 *
 * `s1[i]` and `s2[i]` are equivalent letters, and equivalence is
 * reflexive, symmetric and transitive. Returns the lexicographically
 * smallest string equivalent to `baseStr`.
 *
 * Union–find over the 26 letters where each group's root is its smallest
 * letter; each letter of `baseStr` becomes its group's root.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-equivalent-string/
 * @difficulty Medium
 * @timeComplexity O((n + m) · α(26))
 * @spaceComplexity O(1), 26 letters, excluding the result
 *
 * @example
 * lexicographicallySmallestEquivalentString("parker", "morris", "parser"); // "makkek"
 */
export const lexicographicallySmallestEquivalentString = (
	s1: string,
	s2: string,
	baseStr: string,
): string => {
	const parent = Array.from({ length: 26 }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) x = parent[x] ?? x;
		return x;
	};
	for (let i = 0; i < s1.length; i++) {
		const [a, b] = [find(s1.charCodeAt(i) - 97), find(s2.charCodeAt(i) - 97)];
		if (a < b) parent[b] = a;
		else parent[a] = b;
	}
	return [...baseStr]
		.map((char) => String.fromCharCode(97 + find(char.charCodeAt(0) - 97)))
		.join("");
};

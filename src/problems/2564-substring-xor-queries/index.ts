/**
 * 2564. Substring XOR Queries
 *
 * For each query `[first, second]`, returns the endpoints of the shortest
 * substring of the binary string `s` whose value XORed with `first` gives
 * `second`, preferring the leftmost, or `[-1, -1]` if there is none.
 *
 * The value needed is `first ^ second`, under 2³⁰. Its shortest form has
 * no leading zeros, so record the first occurrence of every value read
 * from a 1 for up to 30 bits, plus the first "0".
 *
 * @see https://leetcode.com/problems/substring-xor-queries/
 * @difficulty Medium
 * @timeComplexity O(30 · n + q)
 * @spaceComplexity O(30 · n)
 *
 * @example
 * substringXorQueries("101101", [[0, 5], [1, 2]]); // [[0, 2], [2, 3]]
 */
export const substringXorQueries = (
	s: string,
	queries: readonly (readonly number[])[],
): number[][] => {
	const first = new Map<number, [number, number]>();
	for (let i = 0; i < s.length; i++) {
		if (s.charAt(i) === "0") {
			if (!first.has(0)) first.set(0, [i, i]);
			continue;
		}
		let value = 0;
		for (let j = i; j < s.length && j < i + 30; j++) {
			value = value * 2 + (s.charCodeAt(j) - 48);
			if (!first.has(value)) first.set(value, [i, j]);
		}
	}
	return queries.map(([a = 0, b = 0]) => [...(first.get(a ^ b) ?? [-1, -1])]);
};

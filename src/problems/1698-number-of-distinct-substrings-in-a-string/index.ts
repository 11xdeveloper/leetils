/**
 * 1698. Number of Distinct Substrings in a String
 *
 * Counts the distinct non-empty substrings of `s`.
 *
 * Builds a suffix automaton in linear time. Every distinct substring
 * belongs to exactly one state, and state `v` holds
 * `length[v] − length[link[v]]` of them.
 *
 * @see https://leetcode.com/problems/number-of-distinct-substrings-in-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfDistinctSubstringsInAString("aabbaba"); // 21
 */
export const numberOfDistinctSubstringsInAString = (s: string): number => {
	const length = [0];
	const link = [-1];
	const next: Map<string, number>[] = [new Map()];
	let last = 0;
	for (const char of s) {
		const current = length.length;
		length.push((length[last] ?? 0) + 1);
		link.push(0);
		next.push(new Map());
		let p = last;
		while (p !== -1 && !next[p]?.has(char)) {
			next[p]?.set(char, current);
			p = link[p] ?? -1;
		}
		if (p !== -1) {
			const q = next[p]?.get(char) ?? 0;
			if ((length[p] ?? 0) + 1 === length[q]) {
				link[current] = q;
			} else {
				const clone = length.length;
				length.push((length[p] ?? 0) + 1);
				link.push(link[q] ?? 0);
				next.push(new Map(next[q]));
				while (p !== -1 && next[p]?.get(char) === q) {
					next[p]?.set(char, clone);
					p = link[p] ?? -1;
				}
				link[q] = clone;
				link[current] = clone;
			}
		}
		last = current;
	}
	let count = 0;
	for (let v = 1; v < length.length; v++)
		count += (length[v] ?? 0) - (length[link[v] ?? 0] ?? 0);
	return count;
};

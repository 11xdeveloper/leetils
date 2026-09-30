/**
 * 1044. Longest Duplicate Substring
 *
 * Returns a longest substring of `s` that occurs at least twice (the
 * occurrences may overlap), or `""` if there's none.
 *
 * Binary search on the length, since a repeated substring of some length
 * implies repeated ones of every shorter length. For a length, a rolling
 * hash finds candidates, and matching hashes are confirmed by comparing
 * the substrings, so collisions can't give a wrong answer.
 *
 * @see https://leetcode.com/problems/longest-duplicate-substring/
 * @difficulty Hard
 * @timeComplexity O(n log n) expected
 * @spaceComplexity O(n)
 *
 * @example
 * longestDuplicateSubstring("banana"); // "ana"
 */
export const longestDuplicateSubstring = (s: string): string => {
	const MOD = 1_000_000_007;
	const BASE = 131;

	const repeated = (length: number): string | undefined => {
		let power = 1;
		for (let i = 1; i < length; i++) power = (power * BASE) % MOD;
		const seen = new Map<number, number[]>();
		let hash = 0;
		for (let i = 0; i < s.length; i++) {
			if (i >= length)
				hash = (hash - ((s.charCodeAt(i - length) * power) % MOD) + MOD) % MOD;
			hash = (hash * BASE + s.charCodeAt(i)) % MOD;
			if (i < length - 1) continue;
			const start = i - length + 1;
			const candidates = seen.get(hash);
			const text = s.slice(start, start + length);
			if (candidates?.some((other) => s.startsWith(text, other))) return text;
			if (candidates) candidates.push(start);
			else seen.set(hash, [start]);
		}
		return undefined;
	};

	let best = "";
	let low = 1;
	let high = s.length - 1;
	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const found = repeated(mid);
		if (found === undefined) {
			high = mid - 1;
		} else {
			best = found;
			low = mid + 1;
		}
	}
	return best;
};

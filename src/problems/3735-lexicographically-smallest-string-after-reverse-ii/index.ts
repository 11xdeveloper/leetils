const MOD = 1_000_000_007;
const BASE = 131;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3735. Lexicographically Smallest String After Reverse II
 *
 * Reverse exactly one prefix or one suffix of `s`, of any length from 1.
 * Returns the smallest result.
 *
 * Every candidate is two pieces, each a substring of s or of s reversed.
 * Compare candidates by binary searching their longest common prefix
 * with polynomial hashes of those pieces, keeping the best.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-string-after-reverse-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestStringAfterReverseII("dcab"); // "acdb"
 */
export const lexicographicallySmallestStringAfterReverseII = (
	s: string,
): string => {
	const n = s.length;
	const reversed = [...s].reverse().join("");
	const powers = [1];
	for (let i = 0; i < n; i++) powers.push(multiply(powers[i] ?? 1, BASE));
	const prefixHashes = (t: string): number[] => {
		const hashes = [0];
		for (let i = 0; i < n; i++)
			hashes.push((multiply(hashes[i] ?? 0, BASE) + t.charCodeAt(i)) % MOD);
		return hashes;
	};
	const sources = [
		{ text: s, hashes: prefixHashes(s) },
		{ text: reversed, hashes: prefixHashes(reversed) },
	];
	/** A candidate: [source, start, length] pieces, concatenated. */
	type Piece = readonly [source: 0 | 1, start: number, length: number];
	const hashOf = (pieces: readonly Piece[], length: number): number => {
		let hash = 0;
		for (const [source, start, size] of pieces) {
			if (length <= 0) break;
			const take = Math.min(size, length);
			const h = sources[source]?.hashes ?? [];
			const part =
				((h[start + take] ?? 0) -
					multiply(h[start] ?? 0, powers[take] ?? 1) +
					MOD) %
				MOD;
			hash = (multiply(hash, powers[take] ?? 1) + part) % MOD;
			length -= take;
		}
		return hash;
	};
	const charAt = (pieces: readonly Piece[], index: number): string => {
		for (const [source, start, size] of pieces) {
			if (index < size)
				return sources[source]?.text.charAt(start + index) ?? "";
			index -= size;
		}
		return "";
	};
	const less = (a: readonly Piece[], b: readonly Piece[]): boolean => {
		let [lo, hi] = [0, n];
		while (lo < hi) {
			const mid = (lo + hi + 1) >>> 1;
			if (hashOf(a, mid) === hashOf(b, mid)) lo = mid;
			else hi = mid - 1;
		}
		return lo < n && charAt(a, lo) < charAt(b, lo);
	};
	let best: readonly Piece[] = [[0, 0, n]];
	for (let k = 1; k <= n; k++) {
		const prefix: Piece[] = [
			[1, n - k, k],
			[0, k, n - k],
		];
		const suffix: Piece[] = [
			[0, 0, n - k],
			[1, 0, k],
		];
		if (less(prefix, best)) best = prefix;
		if (less(suffix, best)) best = suffix;
	}
	return best
		.map(
			([source, start, size]) =>
				sources[source]?.text.slice(start, start + size) ?? "",
		)
		.join("");
};

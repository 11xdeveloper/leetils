/**
 * 2156. Find Substring With Given Hash Value
 *
 * The hash of a string is `Σ val(s[i]) · power^i mod modulo`, with
 * `val("a") = 1`. Returns the first substring of length `k` whose hash is
 * `hashValue`.
 *
 * Roll the hash from right to left, where adding a character at the front
 * multiplies the rest by `power`. Products are split so they stay exact.
 *
 * @see https://leetcode.com/problems/find-substring-with-given-hash-value/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findSubstringWithGivenHashValue("leetcode", 7, 20, 2, 0); // "ee"
 */
export const findSubstringWithGivenHashValue = (
	s: string,
	power: number,
	modulo: number,
	k: number,
	hashValue: number,
): string => {
	/** (a · b) mod `modulo` for a, b < modulo ≤ 10^9, without losing precision. */
	const mulMod = (a: number, b: number): number =>
		(((a * Math.floor(b / 65536)) % modulo) * 65536 + a * (b % 65536)) % modulo;
	const val = (i: number): number => s.charCodeAt(i) - 96;

	let top = 1;
	for (let i = 1; i < k; i++) top = mulMod(top, power % modulo);
	let hash = 0;
	let found = 0;
	for (let i = s.length - 1; i >= 0; i--) {
		if (i + k < s.length)
			hash = (hash - mulMod(val(i + k) % modulo, top) + modulo) % modulo;
		hash = (mulMod(hash, power % modulo) + val(i)) % modulo;
		if (i + k <= s.length && hash === hashValue) found = i;
	}
	return s.slice(found, found + k);
};

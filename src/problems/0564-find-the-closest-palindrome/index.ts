/**
 * 564. Find the Closest Palindrome
 *
 * Given an integer `n` as a string (up to 18 digits), returns the closest
 * palindrome to it, not counting `n` itself, as a string. A tie goes to the
 * smaller.
 *
 * The closest palindrome keeps the first half of `n`'s digits, or changes
 * it by one, mirrored onto the second half. The exceptions are around
 * powers of ten, where the length changes: `99…9` just below and `10…01`
 * just above. It checks those five candidates with `BigInt`, since 18
 * digits exceed 2^53.
 *
 * @see https://leetcode.com/problems/find-the-closest-palindrome/
 * @difficulty Hard
 * @timeComplexity O(d) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * findTheClosestPalindrome("123"); // "121"
 */
export const findTheClosestPalindrome = (n: string): string => {
	const value = BigInt(n);
	const length = n.length;
	const half = BigInt(n.slice(0, Math.ceil(length / 2)));

	const candidates = [
		10n ** BigInt(length - 1) - 1n,
		10n ** BigInt(length) + 1n,
	];
	for (const prefix of [half - 1n, half, half + 1n]) {
		const text = String(prefix);
		const mirrored = [
			...text.slice(0, length % 2 === 0 ? text.length : text.length - 1),
		]
			.reverse()
			.join("");
		candidates.push(BigInt(text + mirrored));
	}

	let best = -1n;
	let bestDistance = -1n;
	for (const candidate of candidates) {
		if (candidate === value || candidate < 0n) continue;
		const distance = candidate > value ? candidate - value : value - candidate;
		if (
			bestDistance < 0n ||
			distance < bestDistance ||
			(distance === bestDistance && candidate < best)
		) {
			best = candidate;
			bestDistance = distance;
		}
	}

	return String(best);
};

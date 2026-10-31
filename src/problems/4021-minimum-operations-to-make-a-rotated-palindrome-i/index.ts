/**
 * 4021. Minimum Operations to Make a Rotated Palindrome I
 *
 * Operations: advance one letter cyclically (z to a), or move the first
 * character to the end. Returns the fewest operations making `s` a
 * palindrome.
 *
 * Try every number of rotations; each mirrored pair then needs the
 * shorter way round from one letter up to the other.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-a-rotated-palindrome-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeARotatedPalindromeI("yb"); // 3
 */
export const minimumOperationsToMakeARotatedPalindromeI = (
	s: string,
): number => {
	const n = s.length;
	const codes = [...s].map((c) => c.charCodeAt(0) - 97);
	let best = Number.POSITIVE_INFINITY;
	for (let r = 0; r < n; r++) {
		let cost = r;
		for (let i = 0; i < Math.floor(n / 2) && cost < best; i++) {
			const [a = 0, b = 0] = [codes[(r + i) % n], codes[(r + n - 1 - i) % n]];
			const up = (((b - a) % 26) + 26) % 26;
			cost += Math.min(up, (26 - up) % 26);
		}
		best = Math.min(best, cost);
	}
	return best;
};

/**
 * 3646. Next Special Palindrome Number
 *
 * A number is special if it's a palindrome and every digit d in it
 * appears exactly d times. Returns the smallest special number greater
 * than `n`.
 *
 * There are few of them: pick a set of digits 1-9 with at most one odd
 * digit (which goes in the middle) and at most 16 digits in all, then
 * arrange half of each digit's copies every way to form the left half.
 * Search those in order for the first above n.
 *
 * @see https://leetcode.com/problems/next-special-palindrome-number/
 * @difficulty Hard
 * @timeComplexity O(S log S), for the S special numbers (a few thousand)
 * @spaceComplexity O(S)
 *
 * @example
 * nextSpecialPalindromeNumber(33); // 212
 */
export const nextSpecialPalindromeNumber = (n: number): number => {
	const found: bigint[] = [];
	for (let set = 1; set < 1 << 9; set++) {
		const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
			(d) => (set >> (d - 1)) & 1,
		);
		const odd = digits.filter((d) => d % 2 === 1);
		if (odd.length > 1 || digits.reduce((a, b) => a + b, 0) > 16) continue;
		const middle = odd.length > 0 ? String(odd[0]) : "";
		const left = new Map(digits.map((d) => [d, Math.floor(d / 2)]));
		const half = digits.reduce((sum, d) => sum + Math.floor(d / 2), 0);
		const build = (prefix: string): void => {
			if (prefix.length === half) {
				found.push(BigInt(prefix + middle + [...prefix].reverse().join("")));
				return;
			}
			for (const [d, remaining] of left)
				if (remaining > 0) {
					left.set(d, remaining - 1);
					build(prefix + d);
					left.set(d, remaining);
				}
		};
		build("");
	}
	found.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
	const target = BigInt(n);
	return Number(found.find((x) => x > target) ?? 0n);
};

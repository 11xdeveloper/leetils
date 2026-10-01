/**
 * 1960. Maximum Product of the Length of Two Palindromic Substrings
 *
 * Returns the largest product of the lengths of two non-overlapping
 * odd-length palindromic substrings of `s`.
 *
 * Manacher's algorithm gives each centre's radius. A palindrome of radius
 * `r` at centre `c` ends at `c + r`, and shrinking keeps it a palindrome,
 * so the longest palindrome ending by each index follows from a sweep
 * (and symmetrically for starting at each index). Try every split point.
 *
 * @see https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-substrings/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumProductOfTheLengthOfTwoPalindromicSubstrings("ababbb"); // 9
 */
export const maximumProductOfTheLengthOfTwoPalindromicSubstrings = (
	s: string,
): number => {
	const n = s.length;
	// radius[c]: the largest r with s[c − r … c + r] a palindrome.
	const radius = new Array<number>(n).fill(0);
	for (let c = 0, left = 0, right = -1; c < n; c++) {
		let r = c > right ? 0 : Math.min(radius[left + right - c] ?? 0, right - c);
		while (c - r - 1 >= 0 && c + r + 1 < n && s[c - r - 1] === s[c + r + 1])
			r++;
		radius[c] = r;
		if (c + r > right) [left, right] = [c - r, c + r];
	}
	const longestEndingBy = (centres: readonly number[]) => {
		// best[i]: the longest odd palindrome within the first i + 1 characters.
		const best = new Array<number>(n).fill(1);
		const queue: number[] = [];
		let head = 0;
		for (let i = 0; i < n; i++) {
			queue.push(i);
			// The earliest centre whose palindrome still reaches i gives the longest one ending at i.
			while (
				head < queue.length &&
				(queue[head] ?? 0) + (centres[queue[head] ?? 0] ?? 0) < i
			)
				head++;
			const centre = queue[head] ?? i;
			best[i] = Math.max(best[i - 1] ?? 1, 2 * (i - centre) + 1);
		}
		return best;
	};
	const prefix = longestEndingBy(radius);
	const suffix = longestEndingBy(radius.toReversed()).reverse();
	let product = 0;
	for (let split = 0; split + 1 < n; split++)
		product = Math.max(
			product,
			(prefix[split] ?? 1) * (suffix[split + 1] ?? 1),
		);
	return product;
};

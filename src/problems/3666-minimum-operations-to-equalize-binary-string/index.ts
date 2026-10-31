/**
 * 3666. Minimum Operations to Equalize Binary String
 *
 * One operation flips exactly `k` different positions of the binary string
 * `s`. Returns the fewest operations that make it all ones, or -1.
 *
 * After t operations each zero must be flipped an odd number of times and
 * each one an even number, at most t each, with t · k flips in all. Those
 * counts can always be arranged into operations, so t works when t · k
 * has the zeros' parity and lies between the zeros' count and the most
 * flips the limits allow. Check t upwards.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-equalize-binary-string/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToEqualizeBinaryString("0101", 3); // 2
 */
export const minimumOperationsToEqualizeBinaryString = (
	s: string,
	k: number,
): number => {
	const n = s.length;
	let zeros = 0;
	for (const c of s) if (c === "0") zeros++;
	for (let t = 0; t <= 2 * n + 2; t++) {
		const flips = t * k;
		if (flips < zeros || (flips - zeros) % 2 !== 0) continue;
		const oddMost = t % 2 === 1 ? t : t - 1;
		const evenMost = t % 2 === 0 ? t : t - 1;
		if (zeros > 0 && oddMost < 1) continue;
		if (flips <= zeros * oddMost + (n - zeros) * evenMost) return t;
	}
	return -1;
};

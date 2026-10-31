/**
 * 3260. Find the Largest Palindrome Divisible by K
 *
 * The largest `n`-digit palindrome (no leading zero) divisible by `k`,
 * where 1 ≤ k ≤ 9, as a string.
 *
 * A digit d at mirrored positions i and n - 1 - i adds d · (10^i + 10^(n-1-i))
 * to the number mod k. Work out, from the middle outwards, which remainders
 * the inner positions can still produce; then pick digits from the outside
 * in, largest first, keeping a completion possible.
 *
 * @see https://leetcode.com/problems/find-the-largest-palindrome-divisible-by-k/
 * @difficulty Hard
 * @timeComplexity O(10 n k)
 * @spaceComplexity O(n k)
 *
 * @example
 * findTheLargestPalindromeDivisibleByK(3, 5); // "595"
 */
export const findTheLargestPalindromeDivisibleByK = (
	n: number,
	k: number,
): string => {
	const half = Math.ceil(n / 2);
	const power = new Array<number>(n).fill(1);
	for (let i = 1; i < n; i++) power[i] = ((power[i - 1] ?? 1) * 10) % k;
	const weight = Array.from({ length: half }, (_, i) =>
		i === n - 1 - i
			? (power[i] ?? 0)
			: ((power[i] ?? 0) + (power[n - 1 - i] ?? 0)) % k,
	);
	// possible[i * k + r]: positions i.. can add up to r mod k.
	const possible = new Uint8Array((half + 1) * k);
	possible[half * k] = 1;
	for (let i = half - 1; i >= 0; i--)
		for (let r = 0; r < k; r++)
			for (let d = i === 0 ? 1 : 0; d <= 9; d++)
				if (
					possible[(i + 1) * k + ((((r - d * (weight[i] ?? 0)) % k) + k) % k)]
				) {
					possible[i * k + r] = 1;
					break;
				}
	const digits: number[] = [];
	for (let i = 0, need = 0; i < half; i++)
		for (let d = 9; d >= 0; d--) {
			const rest = (((need - d * (weight[i] ?? 0)) % k) + k) % k;
			if (possible[(i + 1) * k + rest]) {
				digits.push(d);
				need = rest;
				break;
			}
		}
	const left = digits.join("");
	return left + [...left.slice(0, n - half)].reverse().join("");
};

let palindromesByParity: number[][] | undefined;

/** Every palindrome up to ten digits, split by parity and sorted (built once). */
const palindromes = (): number[][] => {
	if (palindromesByParity) return palindromesByParity;
	const byParity: number[][] = [[], []];
	for (let length = 1; length <= 10; length++) {
		const half = Math.ceil(length / 2);
		for (let left = 10 ** (half - 1); left < 10 ** half; left++) {
			const digits = String(left);
			const mirrored = [...digits.slice(0, length - half)].reverse().join("");
			const value = Number(digits + mirrored);
			byParity[value % 2]?.push(value);
		}
	}
	for (const list of byParity) list.sort((a, b) => a - b);
	palindromesByParity = byParity;
	return byParity;
};

/**
 * 4053. Minimum Operations to Make Every Element Palindromic
 *
 * One operation adds or subtracts 2. Returns the fewest operations making
 * every element a positive palindrome.
 *
 * Steps of 2 keep parity, so each element moves to the nearest palindrome
 * of its own parity. There are only about 2 · 10⁵ palindromes up to ten
 * digits; sort each parity's (once) and binary search.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-every-element-palindromic/
 * @difficulty Medium
 * @timeComplexity O(P log P + n log P), for P palindromes
 * @spaceComplexity O(P)
 *
 * @example
 * minimumOperationsToMakeEveryElementPalindromic([9, 10, 11, 10]); // 2
 */
export const minimumOperationsToMakeEveryElementPalindromic = (
	nums: readonly number[],
): number => {
	const byParity = palindromes();
	let operations = 0;
	for (const x of nums) {
		const list = byParity[x % 2] ?? [];
		let [lo, hi] = [0, list.length];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((list[mid] ?? 0) < x) lo = mid + 1;
			else hi = mid;
		}
		const above =
			lo < list.length ? (list[lo] ?? 0) - x : Number.POSITIVE_INFINITY;
		const below = lo > 0 ? x - (list[lo - 1] ?? 0) : Number.POSITIVE_INFINITY;
		operations += Math.min(above, below) / 2;
	}
	return operations;
};

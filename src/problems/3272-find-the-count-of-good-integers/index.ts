/**
 * 3272. Find the Count of Good Integers
 *
 * Count the `n`-digit integers (no leading zero) whose digits can be
 * rearranged into a palindrome divisible by `k` (also with no leading
 * zero).
 *
 * Enumerate the n-digit palindromes, keep the distinct digit multisets of
 * those divisible by `k`, and count each multiset's arrangements that don't
 * start with 0.
 *
 * @see https://leetcode.com/problems/find-the-count-of-good-integers/
 * @difficulty Hard
 * @timeComplexity O(10^⌈n/2⌉ · n)
 * @spaceComplexity O(10^⌈n/2⌉)
 *
 * @example
 * findTheCountOfGoodIntegers(3, 5); // 27
 */
export const findTheCountOfGoodIntegers = (n: number, k: number): number => {
	const factorial = [1];
	for (let i = 1; i <= n; i++) factorial.push((factorial[i - 1] ?? 1) * i);
	const half = Math.ceil(n / 2);
	const multisets = new Set<string>();
	for (let left = 10 ** (half - 1); left < 10 ** half; left++) {
		const front = String(left);
		const palindrome = front + [...front.slice(0, n - half)].reverse().join("");
		if (Number(palindrome) % k === 0)
			multisets.add([...palindrome].sort().join(""));
	}
	let total = 0;
	for (const multiset of multisets) {
		const counts = new Array<number>(10).fill(0);
		for (const digit of multiset)
			counts[Number(digit)] = (counts[Number(digit)] ?? 0) + 1;
		const arrangements = (length: number) =>
			counts.reduce(
				(result, count) => result / (factorial[count] ?? 1),
				factorial[length] ?? 1,
			);
		let count = arrangements(n);
		if ((counts[0] ?? 0) > 0) {
			counts[0] = (counts[0] ?? 0) - 1;
			count -= arrangements(n - 1);
		}
		total += count;
	}
	return total;
};

/**
 * 3663. Find The Least Frequent Digit
 *
 * Returns the digit appearing least often in `n` (among those that
 * appear), the smallest on ties.
 *
 * @see https://leetcode.com/problems/find-the-least-frequent-digit/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheLeastFrequentDigit(1553322); // 1
 */
export const findTheLeastFrequentDigit = (n: number): number => {
	const counts = new Array<number>(10).fill(0);
	for (const digit of String(n))
		counts[Number(digit)] = (counts[Number(digit)] ?? 0) + 1;
	let best = -1;
	counts.forEach((count, digit) => {
		if (count > 0 && (best < 0 || count < (counts[best] ?? 0))) best = digit;
	});
	return best;
};

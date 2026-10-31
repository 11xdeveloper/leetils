/**
 * 2601. Prime Subtraction Operation
 *
 * Each element may once have a prime strictly smaller than it subtracted.
 * Returns whether that can make `nums` strictly increasing.
 *
 * Greedily make each element as small as possible while staying above
 * the one before: subtract the largest prime that keeps it above.
 *
 * @see https://leetcode.com/problems/prime-subtraction-operation/
 * @difficulty Medium
 * @timeComplexity O(m log log m + n · m), where `m` is the largest number
 * @spaceComplexity O(m)
 *
 * @example
 * primeSubtractionOperation([4, 9, 6, 10]); // true
 */
export const primeSubtractionOperation = (nums: readonly number[]): boolean => {
	const largest = Math.max(...nums);
	const composite = new Uint8Array(largest + 1);
	composite[0] = 1;
	composite[1] = 1;
	for (let p = 2; p * p <= largest; p++)
		if (!composite[p])
			for (let m = p * p; m <= largest; m += p) composite[m] = 1;

	let previous = 0;
	for (const num of nums) {
		let best = num;
		for (let p = num - 1; p >= 2; p--)
			if (!composite[p] && num - p > previous) {
				best = num - p;
				break;
			}
		if (best <= previous) return false;
		previous = best;
	}
	return true;
};

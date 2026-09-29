/**
 * 481. Magical String
 *
 * The magical string `"1221121221221121122…"` consists of 1s and 2s, and
 * the lengths of its runs of equal digits spell out the string itself.
 * Returns how many 1s are among its first `n` digits.
 *
 * Generates the string from its own description: a read pointer walks the
 * digits giving run lengths, and each run appended uses the digit that
 * isn't the last one written.
 *
 * @see https://leetcode.com/problems/magical-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * magicalString(6); // 3: "122112" has three 1s
 */
export const magicalString = (n: number): number => {
	const digits = new Uint8Array(n + 2);
	digits.set([1, 2, 2]);

	let length = 3;
	for (let read = 2; length < n; read++) {
		const digit = 3 - (digits[length - 1] ?? 1);
		for (let run = digits[read] ?? 1; run > 0; run--) digits[length++] = digit;
	}

	let ones = 0;
	for (let i = 0; i < n; i++) if (digits[i] === 1) ones++;
	return ones;
};

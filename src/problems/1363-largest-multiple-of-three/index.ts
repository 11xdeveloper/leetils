/**
 * 1363. Largest Multiple of Three
 *
 * Returns the largest multiple of three that can be written with some of
 * `digits` (each used at most once), as a string without leading zeros, or
 * `""` if there's none.
 *
 * Using every digit is best if their sum is divisible by 3. Otherwise drop
 * the fewest, smallest digits fixing the remainder: one digit with the same
 * remainder, or else two with the other remainder. Then write the rest in
 * descending order.
 *
 * @see https://leetcode.com/problems/largest-multiple-of-three/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestMultipleOfThree([8, 6, 7, 1, 0]); // "8760"
 */
export const largestMultipleOfThree = (digits: readonly number[]): string => {
	const counts = new Array<number>(10).fill(0);
	for (const digit of digits) counts[digit] = (counts[digit] ?? 0) + 1;
	const remainder = digits.reduce((sum, digit) => sum + digit, 0) % 3;
	const drop = (wanted: number, times: number): boolean => {
		let left = times;
		for (let digit = 0; digit <= 9 && left > 0; digit++) {
			if (digit % 3 !== wanted) continue;
			while ((counts[digit] ?? 0) > 0 && left > 0) {
				counts[digit] = (counts[digit] ?? 0) - 1;
				left--;
			}
		}
		return left === 0;
	};
	if (remainder !== 0) {
		const saved = [...counts];
		if (!drop(remainder, 1)) {
			counts.splice(0, 10, ...saved);
			if (!drop(3 - remainder, 2)) return "";
		}
	}
	let result = "";
	for (let digit = 9; digit >= 0; digit--)
		result += String(digit).repeat(counts[digit] ?? 0);
	return result.startsWith("0") ? "0" : result;
};

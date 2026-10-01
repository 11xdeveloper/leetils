/**
 * 1088. Confusing Number II
 *
 * Counts the confusing numbers from 1 to `n`: numbers made only of the
 * digits 0, 1, 6, 8 and 9 that become a different number when rotated 180°.
 *
 * Generates every number up to `n` from those digits, building its rotation
 * alongside it, and counts the ones that differ from their rotation. There
 * are at most about 5^10 of them.
 *
 * @see https://leetcode.com/problems/confusing-number-ii/
 * @difficulty Hard
 * @timeComplexity O(5^d) for d digits of n
 * @spaceComplexity O(d)
 *
 * @example
 * confusingNumberII(20); // 6: 6, 9, 10, 16, 18 and 19
 */
export const confusingNumberII = (n: number): number => {
	const digits = [0, 1, 6, 8, 9];
	const rotated = [0, 1, 9, 8, 6];
	let count = 0;
	// Each number carries its rotation and the place value its next digit's rotation goes in.
	const stack: [value: number, rotation: number, place: number][] = [];
	for (let i = 1; i < digits.length; i++)
		stack.push([digits[i] ?? 0, rotated[i] ?? 0, 10]);
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [value, rotation, place] = item;
		if (value > n) continue;
		if (value !== rotation) count++;
		for (const [i, digit] of digits.entries()) {
			const next = value * 10 + digit;
			if (next <= n)
				stack.push([next, (rotated[i] ?? 0) * place + rotation, place * 10]);
		}
	}
	return count;
};

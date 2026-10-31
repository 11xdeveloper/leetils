const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3337. Total Characters in String After Transformations II
 *
 * Each transformation replaces every letter c with the next `nums[c]`
 * letters after it (wrapping round). Returns the length after `t`
 * transformations, for `t` up to 10⁹, modulo 10⁹ + 7.
 *
 * The length that one letter grows into after t steps is a linear function
 * of the lengths after t - 1, given by a 26 × 26 matrix. Raise it to the
 * t-th power by squaring and apply it to the letter counts.
 *
 * @see https://leetcode.com/problems/total-characters-in-string-after-transformations-ii/
 * @difficulty Hard
 * @timeComplexity O(n + 26³ log t)
 * @spaceComplexity O(26²)
 *
 * @example
 * totalCharactersInStringAfterTransformationsII("abcyy", 2, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]); // 7
 */
export const totalCharactersInStringAfterTransformationsII = (
	s: string,
	t: number,
	nums: readonly number[],
): number => {
	type Matrix = number[];
	const times = (a: Matrix, b: Matrix): Matrix => {
		const result = new Array<number>(26 * 26).fill(0);
		for (let i = 0; i < 26; i++)
			for (let k = 0; k < 26; k++) {
				const left = a[i * 26 + k] ?? 0;
				if (left === 0) continue;
				for (let j = 0; j < 26; j++)
					result[i * 26 + j] =
						((result[i * 26 + j] ?? 0) + multiply(left, b[k * 26 + j] ?? 0)) %
						MOD;
			}
		return result;
	};
	let step: Matrix = new Array<number>(26 * 26).fill(0);
	for (let c = 0; c < 26; c++)
		for (let d = 1; d <= (nums[c] ?? 0); d++) step[c * 26 + ((c + d) % 26)] = 1;
	let power: Matrix = new Array<number>(26 * 26).fill(0);
	for (let c = 0; c < 26; c++) power[c * 27] = 1;
	for (let e = t; e > 0; e = Math.floor(e / 2)) {
		if (e % 2 === 1) power = times(power, step);
		step = times(step, step);
	}
	let total = 0;
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i) - 97;
		for (let d = 0; d < 26; d++)
			total = (total + (power[c * 26 + d] ?? 0)) % MOD;
	}
	return total;
};

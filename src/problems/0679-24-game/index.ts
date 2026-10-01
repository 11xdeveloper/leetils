/**
 * 679. 24 Game
 *
 * Returns whether the four cards (1 to 9) can be combined with `+`, `-`,
 * `*`, `/` and parentheses, using each card once, to make 24. Division is
 * real division, not integer division.
 *
 * Every expression combines two of the current numbers first. It tries each
 * pair with each operation, replaces them with the result, and recurses
 * until one number remains, comparing it with 24 allowing for
 * floating-point error.
 *
 * @see https://leetcode.com/problems/24-game/
 * @difficulty Hard
 * @timeComplexity O(1): a fixed search over four numbers
 * @spaceComplexity O(1)
 *
 * @example
 * twoFourGame([4, 1, 8, 7]); // true: (8 - 4) · (7 - 1)
 */
export const twoFourGame = (cards: readonly number[]): boolean => {
	const solve = (numbers: number[]): boolean => {
		if (numbers.length === 1) return Math.abs((numbers[0] ?? 0) - 24) < 1e-6;
		for (let i = 0; i < numbers.length; i++) {
			for (let j = 0; j < numbers.length; j++) {
				if (i === j) continue;
				const a = numbers[i] ?? 0;
				const b = numbers[j] ?? 0;
				const rest = numbers.filter((_, k) => k !== i && k !== j);
				// Each ordered pair is tried, so a - b and a / b cover both orders; + and * need one.
				const results = [a - b, ...(i < j ? [a + b, a * b] : [])];
				if (Math.abs(b) > 1e-9) results.push(a / b);
				if (results.some((result) => solve([...rest, result]))) return true;
			}
		}
		return false;
	};
	return solve([...cards]);
};

/**
 * 3941. Password Strength
 *
 * Scores each distinct character of `password` once: 1 for a lowercase
 * letter, 2 for uppercase, 3 for a digit and 5 for one of "!@#$".
 *
 * @see https://leetcode.com/problems/password-strength/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * passwordStrength("bbB11#"); // 11
 */
export const passwordStrength = (password: string): number => {
	let score = 0;
	for (const c of new Set(password)) {
		if (c >= "a" && c <= "z") score += 1;
		else if (c >= "A" && c <= "Z") score += 2;
		else if (c >= "0" && c <= "9") score += 3;
		else score += 5;
	}
	return score;
};

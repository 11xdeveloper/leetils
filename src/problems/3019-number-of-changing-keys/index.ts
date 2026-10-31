/**
 * 3019. Number of Changing Keys
 *
 * How many times the typist switches keys while typing `s`, where upper and
 * lower case letters share a key.
 *
 * Count neighbouring letters that differ ignoring case.
 *
 * @see https://leetcode.com/problems/number-of-changing-keys/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfChangingKeys("aAbBcC"); // 2
 */
export const numberOfChangingKeys = (s: string): number => {
	const lower = s.toLowerCase();
	let changes = 0;
	for (let i = 1; i < lower.length; i++)
		if (lower[i] !== lower[i - 1]) changes++;
	return changes;
};

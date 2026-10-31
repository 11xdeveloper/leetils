/**
 * 2193. Minimum Number of Moves to Make Palindrome
 *
 * A move swaps two adjacent characters. Returns the fewest moves to turn
 * `s` into a palindrome (one is always reachable).
 *
 * Greedily fix the outermost pair: bring the copy of the leftmost
 * character nearest the right end into place. A character with no copy is
 * the middle one; nudge it one step inwards and retry.
 *
 * @see https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfMovesToMakePalindrome("aabb"); // 2
 */
export const minimumNumberOfMovesToMakePalindrome = (s: string): number => {
	const chars = [...s];
	let moves = 0;
	for (let [left, right] = [0, chars.length - 1]; left < right; ) {
		let j = right;
		while (j > left && chars[j] !== chars[left]) j--;
		if (j === left) {
			[chars[left], chars[left + 1]] = [
				chars[left + 1] ?? "",
				chars[left] ?? "",
			];
			moves++;
			continue;
		}
		chars.splice(right, 0, ...chars.splice(j, 1));
		moves += right - j;
		left++;
		right--;
	}
	return moves;
};

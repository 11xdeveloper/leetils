/**
 * 2030. Smallest K-Length Subsequence With Occurrences of a Letter
 *
 * Returns the lexicographically smallest subsequence of `s` of length `k`
 * containing `letter` at least `repetition` times.
 *
 * Build it with a monotonic stack: pop a larger top while enough
 * characters remain to reach length `k`, and enough copies of `letter`
 * remain if the top is one. Push a character while there is room, saving
 * room for the copies of `letter` still needed.
 *
 * @see https://leetcode.com/problems/smallest-k-length-subsequence-with-occurrences-of-a-letter/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestKLengthSubsequenceWithOccurrencesOfALetter("leet", 3, "e", 1); // "eet"
 */
export const smallestKLengthSubsequenceWithOccurrencesOfALetter = (
	s: string,
	k: number,
	letter: string,
	repetition: number,
): string => {
	let lettersLeft = [...s].filter((char) => char === letter).length;
	let lettersKept = 0;
	const stack: string[] = [];
	for (const [i, char] of [...s].entries()) {
		for (
			let top = stack.at(-1);
			top !== undefined &&
			top > char &&
			stack.length - 1 + (s.length - i) >= k &&
			(top !== letter || lettersKept - 1 + lettersLeft >= repetition);
			top = stack.at(-1)
		) {
			stack.pop();
			if (top === letter) lettersKept--;
		}
		if (stack.length < k) {
			if (char === letter) {
				stack.push(char);
				lettersKept++;
			} else if (k - stack.length > repetition - lettersKept) {
				stack.push(char);
			}
		}
		if (char === letter) lettersLeft--;
	}
	return stack.join("");
};

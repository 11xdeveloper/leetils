/**
 * 97. Interleaving String
 *
 * Returns whether `s3` can be formed by interleaving `s1` and `s2`: taking
 * all their characters, keeping each string's own order.
 *
 * Dynamic programming over prefixes: the first `i` characters of `s1` and
 * `j` of `s2` can form the first `i + j` of `s3` if the last character came
 * from either string and the rest could be formed without it. Keeps one row
 * of the table at a time.
 *
 * @see https://leetcode.com/problems/interleaving-string/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(n)
 *
 * @example
 * interleavingString("aabcc", "dbbca", "aadbbcbcac"); // true
 */
export const interleavingString = (
	s1: string,
	s2: string,
	s3: string,
): boolean => {
	if (s1.length + s2.length !== s3.length) return false;

	const canForm = new Array<boolean>(s2.length + 1).fill(false);
	for (let i = 0; i <= s1.length; i++) {
		for (let j = 0; j <= s2.length; j++) {
			if (i === 0 && j === 0) {
				canForm[0] = true;
				continue;
			}
			const next = s3[i + j - 1];
			const fromS1 = i > 0 && (canForm[j] ?? false) && s1[i - 1] === next;
			const fromS2 = j > 0 && (canForm[j - 1] ?? false) && s2[j - 1] === next;
			canForm[j] = fromS1 || fromS2;
		}
	}

	return canForm[s2.length] ?? false;
};

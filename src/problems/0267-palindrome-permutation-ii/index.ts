/**
 * 267. Palindrome Permutation II
 *
 * Returns every distinct palindrome that can be made by rearranging the
 * letters of `s`, or an empty array if there are none.
 *
 * A palindrome is fixed by its first half (plus the middle letter, if any),
 * so it counts the letters, takes half of each count as the first half, and
 * builds every distinct arrangement of that half with backtracking over the
 * letters in sorted order. Each half, mirrored around the middle, is one
 * palindrome.
 *
 * @see https://leetcode.com/problems/palindrome-permutation-ii/
 * @difficulty Medium
 * @timeComplexity O(n * (n/2)!)
 * @spaceComplexity O(n) excluding the returned palindromes
 *
 * @example
 * palindromePermutationII("aabb"); // ["abba", "baab"]
 */
export const palindromePermutationII = (s: string): string[] => {
	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);

	const oddLetters = [...counts].filter(([, count]) => count % 2 === 1);
	if (oddLetters.length > 1) return [];
	const middle = oddLetters[0]?.[0] ?? "";

	const remaining = new Map(
		[...counts]
			.map(([char, count]) => [char, Math.floor(count / 2)] as const)
			.toSorted(),
	);
	const halfLength = Math.floor(s.length / 2);
	const palindromes: string[] = [];
	const half: string[] = [];

	const build = (): void => {
		if (half.length === halfLength) {
			const first = half.join("");
			palindromes.push(first + middle + [...first].reverse().join(""));
			return;
		}
		for (const [char, count] of remaining) {
			if (count === 0) continue;
			remaining.set(char, count - 1);
			half.push(char);
			build();
			half.pop();
			remaining.set(char, count);
		}
	};

	build();
	return palindromes;
};

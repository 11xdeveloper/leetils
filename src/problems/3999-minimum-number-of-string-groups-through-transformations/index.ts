/**
 * 3999. Minimum Number of String Groups Through Transformations
 *
 * Two words are equivalent if rotating the letters at even indices and
 * those at odd indices, independently, turns one into the other. Returns
 * the fewest groups of mutually equivalent words.
 *
 * Rotations compose, so this is an equivalence: describe each word by the
 * smallest rotation of its even letters and of its odd letters (Booth's
 * algorithm), and count distinct descriptions.
 *
 * @see https://leetcode.com/problems/minimum-number-of-string-groups-through-transformations/
 * @difficulty Hard
 * @timeComplexity O(L)
 * @spaceComplexity O(L)
 *
 * @example
 * minimumNumberOfStringGroupsThroughTransformations(["abc", "cab", "bac", "acb", "bca", "cba"]); // 3
 */
export const minimumNumberOfStringGroupsThroughTransformations = (
	words: readonly string[],
): number => {
	/** The lexicographically smallest rotation (Booth's algorithm). */
	const smallestRotation = (s: string): string => {
		const n = s.length;
		const doubled = s + s;
		const failure = new Int32Array(2 * n).fill(-1);
		let k = 0;
		for (let j = 1; j < 2 * n; j++) {
			const c = doubled[j] ?? "";
			let i = failure[j - k - 1] ?? -1;
			while (i !== -1 && c !== doubled[k + i + 1]) {
				if (c < (doubled[k + i + 1] ?? "")) k = j - i - 1;
				i = failure[i] ?? -1;
			}
			if (i === -1 && c !== doubled[k + i + 1]) {
				if (c < (doubled[k + i + 1] ?? "")) k = j;
				failure[j - k] = -1;
			} else failure[j - k] = i + 1;
		}
		return doubled.slice(k, k + n);
	};
	const groups = new Set<string>();
	for (const word of words) {
		let [even, odd] = ["", ""];
		for (let i = 0; i < word.length; i++) {
			if (i % 2 === 0) even += word[i];
			else odd += word[i];
		}
		groups.add(`${smallestRotation(even)}|${smallestRotation(odd)}`);
	}
	return groups.size;
};

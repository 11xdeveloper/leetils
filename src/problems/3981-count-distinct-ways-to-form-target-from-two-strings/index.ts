const MOD = 1_000_000_007;

/**
 * 3981. Count Distinct Ways to Form Target from Two Strings
 *
 * Build `target` letter by letter, taking each letter from `word1` or
 * `word2` at increasing positions within each word, using both words.
 * Counts the ways, modulo 1e9+7.
 *
 * Count ways using only prefixes word1[0..i) and word2[0..j): the last
 * letter comes from one word at some earlier matching position, a sum
 * kept running with prefix sums. Subtract the ways using one word alone.
 *
 * @see https://leetcode.com/problems/count-distinct-ways-to-form-target-from-two-strings/
 * @difficulty Hard
 * @timeComplexity O(t · a · b)
 * @spaceComplexity O(a · b)
 *
 * @example
 * countDistinctWaysToFormTargetFromTwoStrings("abc", "bac", "abc"); // 5
 */
export const countDistinctWaysToFormTargetFromTwoStrings = (
	word1: string,
	word2: string,
	target: string,
): number => {
	const [a, b] = [word1.length, word2.length];
	const width = b + 1;
	let ways = new Float64Array((a + 1) * width).fill(1);
	for (const letter of target) {
		const next = new Float64Array((a + 1) * width);
		// fromFirst[i][j]: Σ over matching x < i of ways[x][j]; fromSecond likewise over y < j.
		const fromFirst = new Float64Array((a + 1) * width);
		for (let i = 1; i <= a; i++)
			for (let j = 0; j <= b; j++)
				fromFirst[i * width + j] =
					((fromFirst[(i - 1) * width + j] ?? 0) +
						(word1[i - 1] === letter ? (ways[(i - 1) * width + j] ?? 0) : 0)) %
					MOD;
		for (let i = 0; i <= a; i++) {
			let fromSecond = 0;
			for (let j = 0; j <= b; j++) {
				if (j > 0 && word2[j - 1] === letter)
					fromSecond = (fromSecond + (ways[i * width + j - 1] ?? 0)) % MOD;
				next[i * width + j] =
					((fromFirst[i * width + j] ?? 0) + fromSecond) % MOD;
			}
		}
		ways = next;
	}
	const alone = (word: string): number => {
		const counts = new Array<number>(target.length + 1).fill(0);
		counts[0] = 1;
		for (const c of word)
			for (let t = target.length; t >= 1; t--)
				if (target[t - 1] === c)
					counts[t] = ((counts[t] ?? 0) + (counts[t - 1] ?? 0)) % MOD;
		return counts[target.length] ?? 0;
	};
	return (
		((((ways[a * width + b] ?? 0) - alone(word1) - alone(word2)) % MOD) +
			2 * MOD) %
		MOD
	);
};

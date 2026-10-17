/**
 * 2052. Minimum Cost to Separate Sentence Into Rows
 *
 * Splits a sentence's words into rows of at most `k` characters (words in
 * a row separated by single spaces). Each row but the last costs
 * `(k - length)^2`. Returns the least total cost.
 *
 * `cost[i]` is the cheapest split of the words from `i` on: free if they
 * fit in one last row, otherwise the best first row `i..j` plus
 * `cost[j + 1]`.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-separate-sentence-into-rows/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToSeparateSentenceIntoRows("i love leetcode", 12); // 36
 */
export const minimumCostToSeparateSentenceIntoRows = (
	sentence: string,
	k: number,
): number => {
	const lengths = sentence.split(" ").map((word) => word.length);
	const n = lengths.length;
	const cost = new Array<number>(n + 1).fill(0);
	for (let i = n - 1; i >= 0; i--) {
		let length = -1;
		let rest = 0;
		for (let j = i; j < n; j++) rest += (lengths[j] ?? 0) + 1;
		if (rest - 1 <= k) continue;
		cost[i] = Infinity;
		for (let j = i; j < n; j++) {
			length += (lengths[j] ?? 0) + 1;
			if (length > k) break;
			cost[i] = Math.min(
				cost[i] ?? Infinity,
				(k - length) ** 2 + (cost[j + 1] ?? 0),
			);
		}
	}
	return cost[0] ?? 0;
};

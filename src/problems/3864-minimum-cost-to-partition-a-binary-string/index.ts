/**
 * 3864. Minimum Cost to Partition a Binary String
 *
 * A segment with no 1s costs `flatCost`; otherwise its length times its
 * 1s times `encCost`. A segment of even length may instead be split into
 * two equal halves, each costed the same way. Returns the least cost for
 * the whole string.
 *
 * Recurse on halves, counting 1s with prefix sums.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-partition-a-binary-string/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToPartitionABinaryString("1010", 2, 1); // 6
 */
export const minimumCostToPartitionABinaryString = (
	s: string,
	encCost: number,
	flatCost: number,
): number => {
	const prefix = [0];
	for (const c of s) prefix.push((prefix.at(-1) ?? 0) + (c === "1" ? 1 : 0));
	const cost = (from: number, length: number): number => {
		const ones = (prefix[from + length] ?? 0) - (prefix[from] ?? 0);
		const whole = ones === 0 ? flatCost : length * ones * encCost;
		if (length % 2 === 1) return whole;
		const half = length / 2;
		return Math.min(whole, cost(from, half) + cost(from + half, half));
	};
	return cost(0, s.length);
};

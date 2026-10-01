/**
 * 77. Combinations
 *
 * Returns every combination of `k` numbers chosen from 1 to `n`, each in
 * ascending order, with the combinations in lexicographic order.
 *
 * Backtracking: picks each next number from those after the last one picked,
 * stopping early when too few numbers remain to fill the combination.
 *
 * @see https://leetcode.com/problems/combinations/
 * @difficulty Medium
 * @timeComplexity O(k * C(n, k))
 * @spaceComplexity O(k) excluding the returned combinations
 *
 * @example
 * combinations(4, 2); // [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
 */
export const combinations = (n: number, k: number): number[][] => {
	const results: number[][] = [];
	const current: number[] = [];

	const choose = (start: number): void => {
		if (current.length === k) {
			results.push([...current]);
			return;
		}
		const lastStart = n - (k - current.length) + 1;
		for (let number = start; number <= lastStart; number++) {
			current.push(number);
			choose(number + 1);
			current.pop();
		}
	};

	choose(1);
	return results;
};

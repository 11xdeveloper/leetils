/**
 * 254. Factor Combinations
 *
 * Returns every way to write `n` as a product of two or more factors, each
 * from 2 to `n - 1`. Each combination lists its factors in ascending order.
 *
 * Backtracking: tries each factor, no smaller than the last one chosen, up
 * to the square root of what remains. For each one, the factor and the
 * remaining quotient form a combination, and the quotient is then split
 * further in the same way.
 *
 * @see https://leetcode.com/problems/factor-combinations/
 * @difficulty Medium
 * @timeComplexity O(√n · C) where C is the number of combinations
 * @spaceComplexity O(log n) excluding the returned combinations
 *
 * @example
 * factorCombinations(12); // [[2, 6], [2, 2, 3], [3, 4]]
 */
export const factorCombinations = (n: number): number[][] => {
	const combinations: number[][] = [];
	const factors: number[] = [];

	const split = (remaining: number, smallest: number): void => {
		for (let factor = smallest; factor * factor <= remaining; factor++) {
			if (remaining % factor !== 0) continue;
			const quotient = remaining / factor;
			combinations.push([...factors, factor, quotient]);
			factors.push(factor);
			split(quotient, factor);
			factors.pop();
		}
	};

	split(n, 2);
	return combinations;
};

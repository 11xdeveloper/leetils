/**
 * 216. Combination Sum III
 *
 * Returns every combination of `k` distinct digits from 1 to 9 that adds up
 * to `n`, each in ascending order.
 *
 * Backtracking: picks each next digit from those after the last one picked,
 * stopping when the digit is larger than what remains.
 *
 * @see https://leetcode.com/problems/combination-sum-iii/
 * @difficulty Medium
 * @timeComplexity O(C(9, k) * k)
 * @spaceComplexity O(k) excluding the returned combinations
 *
 * @example
 * combinationSumIII(3, 9); // [[1, 2, 6], [1, 3, 5], [2, 3, 4]]
 */
export const combinationSumIII = (k: number, n: number): number[][] => {
	const combinations: number[][] = [];
	const combination: number[] = [];

	const choose = (start: number, remaining: number): void => {
		if (combination.length === k) {
			if (remaining === 0) combinations.push([...combination]);
			return;
		}
		for (let digit = start; digit <= 9 && digit <= remaining; digit++) {
			combination.push(digit);
			choose(digit + 1, remaining - digit);
			combination.pop();
		}
	};

	choose(1, n);
	return combinations;
};

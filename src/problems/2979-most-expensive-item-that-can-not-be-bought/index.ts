/**
 * 2979. Most Expensive Item That Can Not Be Bought
 *
 * With unlimited coins of two distinct primes, returns the largest amount
 * that can't be paid exactly.
 *
 * Coprime coin values `p` and `q` leave the Frobenius number
 * `pq - p - q` as the largest gap.
 *
 * @see https://leetcode.com/problems/most-expensive-item-that-can-not-be-bought/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * mostExpensiveItemThatCanNotBeBought(5, 7); // 23
 */
export const mostExpensiveItemThatCanNotBeBought = (
	primeOne: number,
	primeTwo: number,
): number => primeOne * primeTwo - primeOne - primeTwo;

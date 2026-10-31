const MOD = 1_000_000_007;

/**
 * 3577. Count the Number of Computer Unlocking Permutations
 *
 * Computer 0 starts unlocked, and computer i can be unlocked by an
 * unlocked j < i with lower complexity. Counts the orders of all computers,
 * starting with 0, that unlock them all, modulo 1e9+7.
 *
 * If every other computer is more complex than computer 0, computer 0 can
 * unlock any of them at any time, so all (n - 1)! orders work. Otherwise
 * the first computer no more complex than 0 has no possible unlocker.
 *
 * @see https://leetcode.com/problems/count-the-number-of-computer-unlocking-permutations/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countTheNumberOfComputerUnlockingPermutations([1, 2, 3]); // 2
 */
export const countTheNumberOfComputerUnlockingPermutations = (
	complexity: readonly number[],
): number => {
	const first = complexity[0] ?? 0;
	let ways = 1;
	for (let i = 1; i < complexity.length; i++) {
		if ((complexity[i] ?? 0) <= first) return 0;
		ways = (ways * i) % MOD;
	}
	return ways;
};

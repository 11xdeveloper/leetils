/**
 * 3669. Balanced K-Factor Decomposition
 *
 * Split `n` into `k` positive factors whose product is n, minimising the
 * difference between the largest and smallest. Returns such factors.
 *
 * Search non-decreasing sequences of divisors, of which there are few.
 *
 * @see https://leetcode.com/problems/balanced-k-factor-decomposition/
 * @difficulty Medium
 * @timeComplexity O(d^(k-1) + √n), for d divisors of n
 * @spaceComplexity O(d + k)
 *
 * @example
 * balancedKFactorDecomposition(44, 3); // [2, 2, 11]
 */
export const balancedKFactorDecomposition = (
	n: number,
	k: number,
): number[] => {
	const divisors: number[] = [];
	for (let d = 1; d <= n; d++) if (n % d === 0) divisors.push(d);
	let best: number[] = [];
	let bestGap = Number.POSITIVE_INFINITY;
	const chosen: number[] = [];
	const search = (rest: number, from: number): void => {
		if (chosen.length === k - 1) {
			if (rest < (chosen.at(-1) ?? 1)) return;
			const gap = rest - (chosen[0] ?? rest);
			if (gap < bestGap) [bestGap, best] = [gap, [...chosen, rest]];
			return;
		}
		for (let i = from; i < divisors.length; i++) {
			const d = divisors[i] ?? 1;
			if (d ** (k - chosen.length) > rest) break;
			if (rest % d !== 0) continue;
			chosen.push(d);
			search(rest / d, i);
			chosen.pop();
		}
	};
	search(n, 0);
	return best;
};

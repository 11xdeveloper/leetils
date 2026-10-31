/**
 * 3703. Remove K-Balanced Substrings
 *
 * Repeatedly delete a substring of exactly `k` opening brackets followed
 * by `k` closing ones from `s`. Returns what's left.
 *
 * Keep a stack of runs of equal brackets. When a run of closing brackets
 * reaches k on top of at least k opening ones, delete both.
 *
 * @see https://leetcode.com/problems/remove-k-balanced-substrings/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * removeKBalancedSubstrings("((()))()()()", 3); // "()()()"
 */
export const removeKBalancedSubstrings = (s: string, k: number): string => {
	const runs: [bracket: string, count: number][] = [];
	for (const c of s) {
		const top = runs.at(-1);
		if (top && top[0] === c) top[1]++;
		else runs.push([c, 1]);
		const last = runs.at(-1);
		const below = runs.at(-2);
		if (
			last?.[0] === ")" &&
			last[1] === k &&
			below?.[0] === "(" &&
			below[1] >= k
		) {
			runs.pop();
			below[1] -= k;
			if (below[1] === 0) runs.pop();
		}
	}
	return runs.map(([c, count]) => c.repeat(count)).join("");
};

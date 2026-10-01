/**
 * 1927. Sum Game
 *
 * Alice and Bob alternately replace a `?` in `num` with a digit; Bob wins
 * if the two halves' digit sums end up equal. Returns whether Alice wins.
 *
 * With an odd number of `?`, Alice makes the last move and can always
 * unbalance. Otherwise Bob can mirror Alice (answering each digit `d` on
 * one side with `9 − d` on the other), so he wins exactly when the extra
 * `?`s on one side make up the sum gap at 4.5 each.
 *
 * @see https://leetcode.com/problems/sum-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * sumGame("25??"); // true
 */
export const sumGame = (num: string): boolean => {
	const half = num.length / 2;
	let [questions, gap] = [0, 0];
	for (let i = 0; i < num.length; i++) {
		const sign = i < half ? 1 : -1;
		if (num[i] === "?") questions += sign;
		else gap += sign * Number(num[i]);
	}
	const total = [...num].filter((c) => c === "?").length;
	if (total % 2 === 1) return true;
	return gap * 2 !== -questions * 9;
};

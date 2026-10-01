/**
 * 464. Can I Win
 *
 * Two players take turns picking unused integers from 1 to
 * `maxChoosableInteger`, adding them to a running total. Whoever brings the
 * total to at least `desiredTotal` wins. Returns whether the first player
 * can force a win, assuming both play optimally.
 *
 * The set of numbers used so far, as a bitmask, determines the remaining
 * total, so it's the whole game state. A state is a win for the player to
 * move if some pick reaches the total or leaves the opponent in a losing
 * state. Results are memoised per mask.
 *
 * @see https://leetcode.com/problems/can-i-win/
 * @difficulty Medium
 * @timeComplexity O(2^m · m) where m is maxChoosableInteger
 * @spaceComplexity O(2^m)
 *
 * @example
 * canIWin(10, 11); // false: whatever the first player picks, the second can reach 11
 */
export const canIWin = (
	maxChoosableInteger: number,
	desiredTotal: number,
): boolean => {
	if (desiredTotal <= 0) return true;
	if ((maxChoosableInteger * (maxChoosableInteger + 1)) / 2 < desiredTotal)
		return false;

	// 0 is unknown, 1 a win for the player to move and 2 a loss.
	const memo = new Uint8Array(1 << maxChoosableInteger);
	const wins = (used: number, remaining: number): boolean => {
		const known = memo[used];
		if (known) return known === 1;

		let result = false;
		for (let pick = maxChoosableInteger; pick >= 1 && !result; pick--) {
			const bit = 1 << (pick - 1);
			if (used & bit) continue;
			result = pick >= remaining || !wins(used | bit, remaining - pick);
		}

		memo[used] = result ? 1 : 2;
		return result;
	};

	return wins(0, desiredTotal);
};

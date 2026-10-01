/**
 * 1535. Find the Winner of an Array Game
 *
 * The first two elements play; the larger stays at the front and the
 * smaller goes to the back. Returns the element that first wins `k` rounds
 * in a row.
 *
 * The champion only changes when a larger element arrives, so one pass
 * suffices: if no one reaches `k` wins, the maximum eventually wins
 * forever.
 *
 * @see https://leetcode.com/problems/find-the-winner-of-an-array-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheWinnerOfAnArrayGame([2, 1, 3, 5, 4, 6, 7], 2); // 5
 */
export const findTheWinnerOfAnArrayGame = (
	arr: readonly number[],
	k: number,
): number => {
	let [champion, wins] = [arr[0] ?? 0, 0];
	for (let i = 1; i < arr.length && wins < k; i++) {
		const challenger = arr[i] ?? 0;
		if (challenger > champion) [champion, wins] = [challenger, 1];
		else wins++;
	}
	return champion;
};

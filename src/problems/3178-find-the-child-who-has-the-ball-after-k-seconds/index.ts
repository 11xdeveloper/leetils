/**
 * 3178. Find the Child Who Has the Ball After K Seconds
 *
 * `n` children in a line pass a ball one step per second, starting from
 * child 0 and turning around at each end. Returns who has it after `k`
 * seconds.
 *
 * The ball's journey repeats every 2(n - 1) seconds: out to the far end
 * and back.
 *
 * @see https://leetcode.com/problems/find-the-child-who-has-the-ball-after-k-seconds/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheChildWhoHasTheBallAfterKSeconds(3, 5); // 1
 */
export const findTheChildWhoHasTheBallAfterKSeconds = (
	n: number,
	k: number,
): number => {
	const t = k % (2 * (n - 1));
	return t < n ? t : 2 * (n - 1) - t;
};

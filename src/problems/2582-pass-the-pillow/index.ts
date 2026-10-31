/**
 * 2582. Pass the Pillow
 *
 * `n` people stand in a line, and a pillow starts with the first. Each
 * second it passes to the next person, reversing direction at either end.
 * Returns who holds it after `time` seconds, numbered from 1.
 *
 * A round trip takes `2(n - 1)` seconds; fold the remainder back if it
 * passes the far end.
 *
 * @see https://leetcode.com/problems/pass-the-pillow/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * passThePillow(4, 5); // 2
 */
export const passThePillow = (n: number, time: number): number => {
	const step = time % (2 * (n - 1));
	return step < n ? step + 1 : 2 * n - 1 - step;
};

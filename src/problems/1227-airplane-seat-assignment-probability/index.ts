/**
 * 1227. Airplane Seat Assignment Probability
 *
 * The first of `n` passengers sits in a random seat; each later passenger
 * takes their own seat if free and a random free seat otherwise. Returns
 * the probability that the last passenger gets their own seat.
 *
 * Whenever someone picks at random, they are equally likely to take the
 * first passenger's seat (settling everyone else correctly) as the last
 * passenger's (dooming them), and otherwise pass the problem on. So the
 * last seat is free with probability 1/2, unless `n` is 1.
 *
 * @see https://leetcode.com/problems/airplane-seat-assignment-probability/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * airplaneSeatAssignmentProbability(2); // 0.5
 */
export const airplaneSeatAssignmentProbability = (n: number): number =>
	n === 1 ? 1 : 0.5;

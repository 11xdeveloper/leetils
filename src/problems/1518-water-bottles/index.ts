/**
 * 1518. Water Bottles
 *
 * Starting with `numBottles` full bottles, and swapping `numExchange`
 * empties for a full one whenever possible, returns how many bottles can be
 * drunk.
 *
 * Simulates the exchanges, carrying left-over empties forward.
 *
 * @see https://leetcode.com/problems/water-bottles/
 * @difficulty Easy
 * @timeComplexity O(log numBottles)
 * @spaceComplexity O(1)
 *
 * @example
 * waterBottles(15, 4); // 19
 */
export const waterBottles = (
	numBottles: number,
	numExchange: number,
): number => {
	let [drunk, empty] = [numBottles, numBottles];
	while (empty >= numExchange) {
		const full = Math.floor(empty / numExchange);
		drunk += full;
		empty = (empty % numExchange) + full;
	}
	return drunk;
};

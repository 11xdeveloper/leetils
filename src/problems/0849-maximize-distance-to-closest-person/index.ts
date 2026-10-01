/**
 * 849. Maximize Distance to Closest Person
 *
 * `seats` marks occupied seats with 1 and empty ones with 0 (at least one
 * of each). Returns the largest distance to the nearest person that
 * sitting in an empty seat can give.
 *
 * A gap of `g` empty seats between two people allows `⌈g / 2⌉`; a gap at
 * either end allows its full length.
 *
 * @see https://leetcode.com/problems/maximize-distance-to-closest-person/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximizeDistanceToClosestPerson([1, 0, 0, 0, 1, 0, 1]); // 2
 */
export const maximizeDistanceToClosestPerson = (
	seats: readonly number[],
): number => {
	const first = seats.indexOf(1);
	const last = seats.lastIndexOf(1);
	let best = Math.max(first, seats.length - 1 - last);
	for (let i = first, previous = first; i <= last; i++) {
		if (seats[i] !== 1) continue;
		best = Math.max(best, Math.floor((i - previous) / 2));
		previous = i;
	}
	return best;
};

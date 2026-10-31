/** The interface LeetCode provides: you stand in front of one house of a circular street. */
interface Street {
	closeDoor(): void;
	isDoorOpen(): boolean;
	moveRight(): void;
}

/**
 * 2753. Count Houses in a Circular Street II
 *
 * Standing on a circular street of at most `k` houses, where at least
 * one door is open and doors can only be closed, returns how many houses
 * there are.
 *
 * Walk to an open door and leave it open. Then walk right `k` steps,
 * closing every other open door you pass; the last open door seen is
 * the starting one, a full lap away.
 *
 * @see https://leetcode.com/problems/count-houses-in-a-circular-street-ii/
 * @difficulty Hard
 * @timeComplexity O(k)
 * @spaceComplexity O(1)
 *
 * @example
 * countHousesInACircularStreetII(street, 10); // the number of houses
 */
export const countHousesInACircularStreetII = (
	street: Street,
	k: number,
): number => {
	while (!street.isDoorOpen()) street.moveRight();
	let houses = 0;
	for (let step = 1; step <= k; step++) {
		street.moveRight();
		if (street.isDoorOpen()) {
			houses = step;
			street.closeDoor();
		}
	}
	return houses;
};

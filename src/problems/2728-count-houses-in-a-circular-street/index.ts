/** The interface LeetCode provides: you stand in front of one house of a circular street. */
interface Street {
	openDoor(): void;
	closeDoor(): void;
	isDoorOpen(): boolean;
	moveRight(): void;
	moveLeft(): void;
}

/**
 * 2728. Count Houses in a Circular Street
 *
 * Standing on a circular street of at most `k` houses, whose doors may be
 * open or closed, returns how many houses there are.
 *
 * Close the doors of the next `k` houses, which covers every house, then
 * open your own and walk right until you see an open door again.
 *
 * @see https://leetcode.com/problems/count-houses-in-a-circular-street/
 * @difficulty Easy
 * @timeComplexity O(k)
 * @spaceComplexity O(1)
 *
 * @example
 * countHousesInACircularStreet(street, 10); // the number of houses
 */
export const countHousesInACircularStreet = (
	street: Street,
	k: number,
): number => {
	for (let i = 0; i < k; i++) {
		street.closeDoor();
		street.moveRight();
	}
	street.openDoor();
	let houses = 1;
	for (street.moveRight(); !street.isDoorOpen(); street.moveRight()) houses++;
	return houses;
};

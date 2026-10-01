/**
 * 1603. Design Parking System
 *
 * A car park with a fixed number of big, medium and small spaces.
 * `addCar(carType)` parks a car of type 1, 2 or 3 in a space of its size if
 * one is free, returning whether it did.
 *
 * Counts the free spaces of each size.
 *
 * @see https://leetcode.com/problems/design-parking-system/
 * @difficulty Easy
 * @timeComplexity O(1) per car
 * @spaceComplexity O(1)
 *
 * @example
 * const parking = new DesignParkingSystem(1, 1, 0);
 * parking.addCar(1); // true
 * parking.addCar(3); // false
 */
export class DesignParkingSystem {
	readonly #free: number[];

	constructor(big: number, medium: number, small: number) {
		this.#free = [0, big, medium, small];
	}

	addCar(carType: number): boolean {
		const free = this.#free[carType] ?? 0;
		if (free === 0) return false;
		this.#free[carType] = free - 1;
		return true;
	}
}

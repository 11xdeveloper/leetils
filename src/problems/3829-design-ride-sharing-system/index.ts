/**
 * 3829. Design Ride Sharing System
 *
 * Riders and drivers queue up; matching pairs the earliest available
 * driver with the earliest waiting rider, returning [driver, rider] or
 * [-1, -1]. A waiting rider may cancel.
 *
 * Two queues, with cancelled riders skipped when they reach the front.
 *
 * @see https://leetcode.com/problems/design-ride-sharing-system/
 * @difficulty Medium
 * @timeComplexity O(1) per operation, amortised
 * @spaceComplexity O(n)
 *
 * @example
 * const system = new DesignRideSharingSystem();
 * system.addRider(3);
 * system.addDriver(2);
 * system.matchDriverWithRider(); // [2, 3]
 */
export class DesignRideSharingSystem {
	readonly #riders: number[] = [];
	readonly #drivers: number[] = [];
	readonly #waiting = new Set<number>();
	#riderHead = 0;
	#driverHead = 0;

	addRider(riderId: number): void {
		this.#riders.push(riderId);
		this.#waiting.add(riderId);
	}

	addDriver(driverId: number): void {
		this.#drivers.push(driverId);
	}

	matchDriverWithRider(): number[] {
		while (
			this.#riderHead < this.#riders.length &&
			!this.#waiting.has(this.#riders[this.#riderHead] ?? 0)
		)
			this.#riderHead++;
		if (
			this.#riderHead >= this.#riders.length ||
			this.#driverHead >= this.#drivers.length
		)
			return [-1, -1];
		const rider = this.#riders[this.#riderHead++] ?? 0;
		this.#waiting.delete(rider);
		return [this.#drivers[this.#driverHead++] ?? 0, rider];
	}

	cancelRider(riderId: number): void {
		this.#waiting.delete(riderId);
	}
}

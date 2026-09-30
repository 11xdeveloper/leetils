/**
 * 1396. Design Underground System
 *
 * Tracks journeys: `checkIn(id, station, t)`, `checkOut(id, station, t)`,
 * and `getAverageTime(start, end)`, the average of completed journeys
 * between those stations.
 *
 * Remembers each traveller's check-in, and a running total and count of
 * journey times for each pair of stations.
 *
 * @see https://leetcode.com/problems/design-underground-system/
 * @difficulty Medium
 * @timeComplexity O(1) per operation, plus the length of the station names
 * @spaceComplexity O(travellers + station pairs)
 *
 * @example
 * const underground = new DesignUndergroundSystem();
 * underground.checkIn(10, "Leyton", 3);
 * underground.checkOut(10, "Paradise", 8);
 * underground.getAverageTime("Leyton", "Paradise"); // 5
 */
export class DesignUndergroundSystem {
	readonly #checkIns = new Map<number, [station: string, time: number]>();
	readonly #journeys = new Map<string, [total: number, count: number]>();

	checkIn(id: number, stationName: string, t: number): void {
		this.#checkIns.set(id, [stationName, t]);
	}

	checkOut(id: number, stationName: string, t: number): void {
		const [start, time] = this.#checkIns.get(id) ?? ["", t];
		this.#checkIns.delete(id);
		const key = JSON.stringify([start, stationName]);
		const [total, count] = this.#journeys.get(key) ?? [0, 0];
		this.#journeys.set(key, [total + t - time, count + 1]);
	}

	getAverageTime(startStation: string, endStation: string): number {
		const [total, count] = this.#journeys.get(
			JSON.stringify([startStation, endStation]),
		) ?? [0, 1];
		return total / count;
	}
}

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { distanceBetweenBusStops } from ".";

/** Walks each way round the circle. */
const byBruteForce = (
	distance: number[],
	start: number,
	destination: number,
) => {
	const n = distance.length;
	let clockwise = 0;
	for (let stop = start; stop !== destination; stop = (stop + 1) % n) {
		clockwise += distance[stop] ?? 0;
	}
	let anticlockwise = 0;
	for (let stop = start; stop !== destination; stop = (stop - 1 + n) % n) {
		anticlockwise += distance[(stop - 1 + n) % n] ?? 0;
	}
	return Math.min(clockwise, anticlockwise);
};

describe("1184. Distance Between Bus Stops", () => {
	it("solves the examples from the problem statement", () => {
		expect(distanceBetweenBusStops([1, 2, 3, 4], 0, 1)).toBe(1);
		expect(distanceBetweenBusStops([1, 2, 3, 4], 0, 2)).toBe(3);
		expect(distanceBetweenBusStops([1, 2, 3, 4], 0, 3)).toBe(4);
	});

	it("matches walking each way on random inputs", () => {
		const random = createRandom(1184);
		for (let run = 0; run < 300; run++) {
			const distance = random.array(random.int(1, 10), 0, 10);
			const [start, destination] = [
				random.int(0, distance.length - 1),
				random.int(0, distance.length - 1),
			];
			expect(distanceBetweenBusStops(distance, start, destination)).toBe(
				byBruteForce(distance, start, destination),
			);
		}
	});
});

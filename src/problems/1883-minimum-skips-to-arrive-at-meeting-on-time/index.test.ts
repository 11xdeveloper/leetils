import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSkipsToArriveAtMeetingOnTime as minSkips } from ".";

/** Tries every set of skipped rests, in exact units of 1 / speed hours. */
const byBruteForce = (
	dist: number[],
	speed: number,
	hoursBefore: number,
): number => {
	let best = Infinity;
	for (let mask = 0; mask < 1 << Math.max(dist.length - 1, 0); mask++) {
		let time = 0;
		for (const [i, road] of dist.entries()) {
			time += road;
			if (i < dist.length - 1 && !(mask & (1 << i)))
				time = Math.ceil(time / speed) * speed;
		}
		let skips = 0;
		for (let bits = mask; bits > 0; bits &= bits - 1) skips++;
		if (time <= hoursBefore * speed) best = Math.min(best, skips);
	}
	return best === Infinity ? -1 : best;
};

describe("1883. Minimum Skips to Arrive at Meeting On Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSkips([1, 3, 2], 4, 2)).toBe(1);
		expect(minSkips([7, 3, 5, 5], 2, 10)).toBe(2);
		expect(minSkips([7, 3, 5, 5], 1, 10)).toBe(-1);
	});

	it("matches trying every set of skips on random inputs", () => {
		const random = createRandom(1883);
		for (let run = 0; run < 300; run++) {
			const dist = random.array(random.int(1, 8), 1, 10);
			const [speed, hoursBefore] = [random.int(1, 6), random.int(1, 15)];
			expect(minSkips(dist, speed, hoursBefore)).toBe(
				byBruteForce(dist, speed, hoursBefore),
			);
		}
	});
});

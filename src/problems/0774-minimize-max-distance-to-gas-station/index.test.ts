import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeMaxDistanceToGasStation as minmaxGasDist } from ".";

/** Adds stations one at a time to the gap whose pieces are currently largest. */
const byGreedy = (stations: number[], k: number): number => {
	const gaps = stations
		.slice(1)
		.map((station, i) => ({ length: station - (stations[i] ?? 0), pieces: 1 }));
	for (let added = 0; added < k; added++) {
		const widest = gaps.reduce((a, b) =>
			b.length / b.pieces > a.length / a.pieces ? b : a,
		);
		widest.pieces++;
	}
	return Math.max(...gaps.map((gap) => gap.length / gap.pieces));
};

describe("774. Minimize Max Distance to Gas Station", () => {
	it("solves the examples from the problem statement", () => {
		expect(minmaxGasDist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9)).toBeCloseTo(
			0.5,
			6,
		);
		expect(
			minmaxGasDist([23, 24, 36, 39, 46, 56, 57, 65, 84, 98], 1),
		).toBeCloseTo(14, 6);
	});

	it("matches adding stations greedily to the widest piece on random inputs", () => {
		const random = createRandom(774);
		for (let run = 0; run < 500; run++) {
			const stations = [
				...new Set(random.array(random.int(2, 10), 0, 100)),
			].sort((a, b) => a - b);
			if (stations.length < 2) continue;
			const k = random.int(1, 20);
			expect(
				Math.abs(minmaxGasDist(stations, k) - byGreedy(stations, k)),
			).toBeLessThan(1e-6);
		}
	});
});

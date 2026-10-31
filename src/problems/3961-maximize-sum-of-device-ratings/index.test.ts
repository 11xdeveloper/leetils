import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeSumOfDeviceRatings as maxRatings } from ".";

/** Tries every set of moves. */
const byBruteForce = (units: number[][]): number => {
	const m = units.length;
	let best = 0;
	const go = (i: number, devices: number[][]): void => {
		if (i === m) {
			best = Math.max(
				best,
				devices.reduce((s, d) => s + (d.length ? Math.min(...d) : 0), 0),
			);
			return;
		}
		go(i + 1, devices);
		(units[i] ?? []).forEach((unit, k) => {
			for (let j = 0; j < m; j++) {
				if (j === i) continue;
				const next = devices.map((d) => [...d]);
				const at = next[i]?.indexOf(unit) ?? -1;
				if (at < 0 || k < 0) continue;
				next[i]?.splice(at, 1);
				next[j]?.push(unit);
				go(i + 1, next);
			}
		});
	};
	go(
		0,
		units.map((d) => [...d]),
	);
	return best;
};

describe("3961. Maximize Sum of Device Ratings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxRatings([
				[1, 3],
				[2, 2],
			]),
		).toBe(4);
		expect(
			maxRatings([
				[1, 2, 3],
				[4, 5, 6],
			]),
		).toBe(6);
		expect(
			maxRatings([
				[5, 5, 5],
				[1, 1, 1],
			]),
		).toBe(6);
	});

	it("matches trying every move on random devices", () => {
		const random = createRandom(3961);
		for (let run = 0; run < 150; run++) {
			const [m, n] = [random.int(1, 3), random.int(1, 3)];
			const units = Array.from({ length: m }, () => random.array(n, 1, 6));
			expect(maxRatings(units)).toBe(byBruteForce(units));
		}
	});
});

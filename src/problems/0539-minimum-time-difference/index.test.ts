import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeDifference as findMinDifference } from ".";

const byBruteForce = (times: string[]): number => {
	const minutes = times.map(
		(time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3)),
	);
	let smallest = Number.POSITIVE_INFINITY;
	for (const [i, a] of minutes.entries()) {
		for (const [j, b] of minutes.entries()) {
			if (i !== j)
				smallest = Math.min(smallest, Math.abs(a - b), 1440 - Math.abs(a - b));
		}
	}
	return smallest;
};

describe("539. Minimum Time Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMinDifference(["23:59", "00:00"])).toBe(1);
		expect(findMinDifference(["00:00", "23:59", "00:00"])).toBe(0);
	});

	it("matches comparing every pair on random inputs", () => {
		const random = createRandom(539);
		const pad = (value: number) => String(value).padStart(2, "0");
		for (let run = 0; run < 1000; run++) {
			const times = Array.from(
				{ length: random.int(2, 8) },
				() => `${pad(random.int(0, 23))}:${pad(random.int(0, 59))}`,
			);
			expect(findMinDifference(times)).toBe(byBruteForce(times));
		}
	});
});

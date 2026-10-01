import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { videoStitching } from ".";

/** Tries every subset of clips. */
const byBruteForce = (clips: number[][], time: number): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << clips.length; mask++) {
		const chosen = clips.filter((_, i) => mask & (1 << i));
		const covered = Array.from({ length: time }, (_, t) =>
			chosen.some(([s = 0, e = 0]) => s <= t && t + 1 <= e),
		).every(Boolean);
		if (covered) best = Math.min(best, chosen.length);
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};

describe("1024. Video Stitching", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			videoStitching(
				[
					[0, 2],
					[4, 6],
					[8, 10],
					[1, 9],
					[1, 5],
					[5, 9],
				],
				10,
			),
		).toBe(3);
		expect(
			videoStitching(
				[
					[0, 1],
					[1, 2],
				],
				5,
			),
		).toBe(-1);
		expect(
			videoStitching(
				[
					[0, 1],
					[6, 8],
					[0, 2],
					[5, 6],
					[0, 4],
					[0, 3],
					[6, 7],
					[1, 3],
					[4, 7],
					[1, 4],
					[2, 5],
					[2, 6],
					[3, 4],
					[4, 5],
					[5, 7],
					[6, 9],
				],
				9,
			),
		).toBe(3);
	});

	it("matches trying every set of clips on random inputs", () => {
		const random = createRandom(1024);
		for (let run = 0; run < 500; run++) {
			const clips = Array.from({ length: random.int(1, 8) }, () => {
				const start = random.int(0, 9);
				return [start, random.int(start, 10)];
			});
			const time = random.int(1, 10);
			expect(videoStitching(clips, time)).toBe(byBruteForce(clips, time));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfSecondsToMakeMountainHeightZero as minNumberOfSeconds } from ".";

/** Gives each unit of height to the worker who'd finish it soonest. */
const byBruteForce = (height: number, times: number[]): number => {
	const done = times.map(() => 0);
	let finish = 0;
	for (let unit = 0; unit < height; unit++) {
		let pick = 0;
		const cost = (i: number) =>
			((times[i] ?? 0) * (((done[i] ?? 0) + 1) * ((done[i] ?? 0) + 2))) / 2;
		for (let i = 1; i < times.length; i++) if (cost(i) < cost(pick)) pick = i;
		finish = Math.max(finish, cost(pick));
		done[pick] = (done[pick] ?? 0) + 1;
	}
	return finish;
};

describe("3296. Minimum Number of Seconds to Make Mountain Height Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(minNumberOfSeconds(4, [2, 1, 1])).toBe(3);
		expect(minNumberOfSeconds(10, [3, 2, 2, 4])).toBe(12);
		expect(minNumberOfSeconds(5, [1])).toBe(15);
	});

	it("matches assigning units greedily on random inputs", () => {
		const random = createRandom(3296);
		for (let run = 0; run < 200; run++) {
			const height = random.int(1, 40);
			const times = random.array(random.int(1, 5), 1, 10);
			expect(minNumberOfSeconds(height, times)).toBe(
				byBruteForce(height, times),
			);
		}
	});

	it("handles the largest inputs", () => {
		expect(minNumberOfSeconds(1e5, [1e6])).toBe(1e6 * 5000050000);
	});
});

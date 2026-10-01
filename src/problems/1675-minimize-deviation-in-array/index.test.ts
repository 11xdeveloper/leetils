import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeDeviationInArray as minimumDeviation } from ".";

/** For each possible minimum, raises every element to its smallest reachable value at least that. */
const byBruteForce = (nums: number[]): number => {
	const reachable = nums.map((num) => {
		let top = num % 2 === 1 ? num * 2 : num;
		const values = [top];
		while (top % 2 === 0) {
			top /= 2;
			values.push(top);
		}
		return values;
	});
	let best = Infinity;
	for (const low of reachable.flat()) {
		const chosen = reachable.map((values) =>
			Math.min(...values.filter((value) => value >= low)),
		);
		if (chosen.every(Number.isFinite))
			best = Math.min(best, Math.max(...chosen) - low);
	}
	return best;
};

describe("1675. Minimize Deviation in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDeviation([1, 2, 3, 4])).toBe(1);
		expect(minimumDeviation([4, 1, 5, 20, 3])).toBe(3);
		expect(minimumDeviation([2, 10, 8])).toBe(3);
	});

	it("matches trying every minimum on random inputs", () => {
		const random = createRandom(1675);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 8), 1, 100);
			expect(minimumDeviation(nums)).toBe(byBruteForce(nums));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { timeNeededToRearrangeABinaryString as secondsToRemoveOccurrences } from ".";

const bySimulation = (s: string): number => {
	let seconds = 0;
	while (s.includes("01")) {
		s = s.replaceAll("01", "10");
		seconds++;
	}
	return seconds;
};

describe("2380. Time Needed to Rearrange a Binary String", () => {
	it("solves the examples from the problem statement", () => {
		expect(secondsToRemoveOccurrences("0110101")).toBe(4);
		expect(secondsToRemoveOccurrences("11100")).toBe(0);
	});

	it("matches simulating on random strings", () => {
		const random = createRandom(2380);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "01");
			expect(secondsToRemoveOccurrences(s)).toBe(bySimulation(s));
		}
	});
});

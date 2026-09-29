import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splitConcatenatedStrings as splitLoopedString } from ".";

/** Tries every choice of orientations and every cut. */
const byBruteForce = (strs: string[]): string => {
	let largest = "";
	for (let mask = 0; mask < 1 << strs.length; mask++) {
		const loop = strs
			.map((str, i) => (mask & (1 << i) ? [...str].reverse().join("") : str))
			.join("");
		for (let cut = 0; cut < loop.length; cut++) {
			const candidate = loop.slice(cut) + loop.slice(0, cut);
			if (candidate > largest) largest = candidate;
		}
	}
	return largest;
};

describe("555. Split Concatenated Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitLoopedString(["abc", "xyz"])).toBe("zyxcba");
		expect(splitLoopedString(["abc"])).toBe("cba");
	});

	it("matches trying every orientation and cut on random inputs", () => {
		const random = createRandom(555);
		for (let run = 0; run < 500; run++) {
			const strs = Array.from({ length: random.int(1, 5) }, () =>
				random.string(random.int(1, 4), "abc"),
			);
			expect(splitLoopedString(strs)).toBe(byBruteForce(strs));
		}
	});
});

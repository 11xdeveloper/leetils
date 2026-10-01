import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { strobogrammaticNumber } from "../0246-strobogrammatic-number";
import { strobogrammaticNumberII } from "../0247-strobogrammatic-number-ii";
import { strobogrammaticNumberIII } from ".";

const byChecking = (low: number, high: number): number => {
	let count = 0;
	for (let n = low; n <= high; n++)
		if (strobogrammaticNumber(String(n))) count++;
	return count;
};

describe("248. Strobogrammatic Number III", () => {
	it("solves the examples from the problem statement", () => {
		expect(strobogrammaticNumberIII("50", "100")).toBe(3);
		expect(strobogrammaticNumberIII("0", "0")).toBe(1);
	});

	it("includes both bounds", () => {
		expect(strobogrammaticNumberIII("69", "96")).toBe(3);
	});

	it("counts every strobogrammatic number up to 15 digits", () => {
		let total = 0;
		for (let length = 1; length <= 15; length++)
			total += strobogrammaticNumberII(length).length;
		expect(strobogrammaticNumberIII("0", "999999999999999")).toBe(total);
	});

	it("matches checking every number on random ranges", () => {
		const random = createRandom(248);
		for (let run = 0; run < 300; run++) {
			const low = random.int(0, 20_000);
			const high = low + random.int(0, 20_000);
			expect(strobogrammaticNumberIII(String(low), String(high))).toBe(
				byChecking(low, high),
			);
		}
	});
});

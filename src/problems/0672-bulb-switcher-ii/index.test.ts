import { describe, expect, it } from "bun:test";
import { bulbSwitcherII as flipLights } from ".";

/** Tries every combination of buttons pressed an odd number of times that fits the presses. */
const bySimulation = (n: number, presses: number): number => {
	const states = new Set<string>();
	for (let buttons = 0; buttons < 16; buttons++) {
		let odd = 0;
		for (let bits = buttons; bits; bits &= bits - 1) odd++;
		if (odd > presses || (presses - odd) % 2 !== 0) continue;
		const bulbs = Array.from({ length: n }, (_, i) => {
			const label = i + 1;
			let on = true;
			if (buttons & 1) on = !on;
			if (buttons & 2 && label % 2 === 0) on = !on;
			if (buttons & 4 && label % 2 === 1) on = !on;
			if (buttons & 8 && label % 3 === 1) on = !on;
			return on ? 1 : 0;
		});
		states.add(bulbs.join(""));
	}
	return states.size;
};

describe("672. Bulb Switcher II", () => {
	it("solves the examples from the problem statement", () => {
		expect(flipLights(1, 1)).toBe(2);
		expect(flipLights(2, 1)).toBe(3);
		expect(flipLights(3, 1)).toBe(4);
	});

	it("matches trying every combination of buttons for small n and presses", () => {
		for (let n = 1; n <= 12; n++)
			for (let presses = 0; presses <= 8; presses++)
				expect(flipLights(n, presses)).toBe(bySimulation(n, presses));
	});
});

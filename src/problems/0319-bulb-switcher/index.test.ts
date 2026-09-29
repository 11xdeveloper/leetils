import { describe, expect, it } from "bun:test";
import { bulbSwitcher } from ".";

const bySimulation = (n: number): number => {
	const on = new Array<boolean>(n + 1).fill(false);
	for (let round = 1; round <= n; round++) {
		for (let bulb = round; bulb <= n; bulb += round) on[bulb] = !on[bulb];
	}
	return on.filter(Boolean).length;
};

describe("319. Bulb Switcher", () => {
	it("solves the examples from the problem statement", () => {
		expect(bulbSwitcher(3)).toBe(1);
		expect(bulbSwitcher(0)).toBe(0);
		expect(bulbSwitcher(1)).toBe(1);
	});

	it("matches simulating every round for n up to 1000", () => {
		for (let n = 0; n <= 1000; n++)
			expect(bulbSwitcher(n)).toBe(bySimulation(n));
	});

	it("handles the constraint of 10^9", () => {
		expect(bulbSwitcher(1e9)).toBe(31622);
	});
});

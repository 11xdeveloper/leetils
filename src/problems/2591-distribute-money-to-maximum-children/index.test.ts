import { describe, expect, it } from "bun:test";
import { distributeMoneyToMaximumChildren as distMoney } from ".";

/** Tries every distribution. */
const byBruteForce = (money: number, children: number): number => {
	const best = (left: number, kids: number): number => {
		if (kids === 0) return left === 0 ? 0 : -1;
		let most = -1;
		for (let give = 1; give <= left; give++) {
			if (give === 4) continue;
			const rest = best(left - give, kids - 1);
			if (rest >= 0) most = Math.max(most, rest + (give === 8 ? 1 : 0));
		}
		return most;
	};
	return best(money, children);
};

describe("2591. Distribute Money to Maximum Children", () => {
	it("solves the examples from the problem statement", () => {
		expect(distMoney(20, 3)).toBe(1);
		expect(distMoney(16, 2)).toBe(2);
	});

	it("matches trying every distribution for small amounts", () => {
		for (let money = 1; money <= 30; money++)
			for (let children = 2; children <= 4; children++)
				expect(distMoney(money, children)).toBe(byBruteForce(money, children));
	});
});

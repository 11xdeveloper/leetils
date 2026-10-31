import { describe, expect, it } from "bun:test";
import { maximumNumberOfUpgradableServers as maxUpgrades } from ".";

describe("3155. Maximum Number of Upgradable Servers", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxUpgrades([4, 3], [3, 5], [4, 2], [8, 9])).toEqual([3, 2]);
		expect(maxUpgrades([1], [2], [1], [1])).toEqual([0]);
	});

	it("matches trying every number sold", () => {
		for (let servers = 1; servers <= 6; servers++)
			for (let cost = 1; cost <= 4; cost++)
				for (let price = 1; price <= 4; price++)
					for (let cash = 0; cash <= 10; cash++) {
						let best = 0;
						for (let x = 0; x <= servers; x++)
							if ((servers - x) * cost <= cash + x * price)
								best = Math.max(best, servers - x);
						expect(maxUpgrades([servers], [cost], [price], [cash])).toEqual([
							best,
						]);
					}
	});
});

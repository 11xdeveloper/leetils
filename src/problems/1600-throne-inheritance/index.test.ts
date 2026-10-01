import { describe, expect, it } from "bun:test";
import { ThroneInheritance } from ".";

describe("1600. Throne Inheritance", () => {
	it("solves the example from the problem statement", () => {
		const kingdom = new ThroneInheritance("king");
		for (const [parent, child] of [
			["king", "andy"],
			["king", "bob"],
			["king", "catherine"],
			["andy", "matthew"],
			["bob", "alex"],
			["bob", "asha"],
		] as const) {
			kingdom.birth(parent, child);
		}
		expect(kingdom.getInheritanceOrder()).toEqual([
			"king",
			"andy",
			"matthew",
			"bob",
			"alex",
			"asha",
			"catherine",
		]);
		kingdom.death("bob");
		expect(kingdom.getInheritanceOrder()).toEqual([
			"king",
			"andy",
			"matthew",
			"alex",
			"asha",
			"catherine",
		]);
	});

	it("handles a very long line of descent", () => {
		const kingdom = new ThroneInheritance("p0");
		for (let i = 1; i < 100000; i++) kingdom.birth(`p${i - 1}`, `p${i}`);
		const order = kingdom.getInheritanceOrder();
		expect(order).toHaveLength(100000);
		expect(order.at(-1)).toBe("p99999");
	});
});

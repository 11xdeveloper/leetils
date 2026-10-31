import { describe, expect, it } from "bun:test";
import { fruitsIntoBasketsII as numOfUnplacedFruits } from ".";

describe("3477. Fruits Into Baskets II", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfUnplacedFruits([4, 2, 5], [3, 5, 4])).toBe(1);
		expect(numOfUnplacedFruits([3, 6, 1], [6, 4, 7])).toBe(0);
	});
});

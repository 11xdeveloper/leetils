import { describe, expect, it } from "bun:test";
import { ropeTreeFromArray } from "../../structures/rope-tree-node";
import { extractKthCharacterFromTheRopeTree as getKthCharacter } from ".";

describe("2689. Extract Kth Character From The Rope Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getKthCharacter(ropeTreeFromArray([10, 4, "abcpoe", "g", "rta"]), 6),
		).toBe("b");
		expect(
			getKthCharacter(
				ropeTreeFromArray([12, 6, 6, "abc", "efg", "hij", "klm"]),
				3,
			),
		).toBe("c");
		expect(getKthCharacter(ropeTreeFromArray(["ropetree"]), 8)).toBe("e");
	});

	it("reads every character in order", () => {
		const root = ropeTreeFromArray([10, 4, "abcpoe", "g", "rta"]);
		const text = Array.from({ length: 10 }, (_, i) =>
			getKthCharacter(root, i + 1),
		).join("");
		expect(text).toBe("grtaabcpoe");
	});
});

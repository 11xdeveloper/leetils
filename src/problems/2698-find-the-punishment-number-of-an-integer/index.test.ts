import { describe, expect, it } from "bun:test";
import { findThePunishmentNumberOfAnInteger as punishmentNumber } from ".";

describe("2698. Find the Punishment Number of an Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(punishmentNumber(10)).toBe(182);
		expect(punishmentNumber(37)).toBe(1478);
	});
});

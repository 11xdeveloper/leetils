import { describe, expect, it } from "bun:test";
import { numberOfPeopleAwareOfASecret as peopleAwareOfSecret } from ".";

describe("2327. Number of People Aware of a Secret", () => {
	it("solves the examples from the problem statement", () => {
		expect(peopleAwareOfSecret(6, 2, 4)).toBe(5);
		expect(peopleAwareOfSecret(4, 1, 3)).toBe(6);
	});
});

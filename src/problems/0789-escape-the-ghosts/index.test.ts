import { describe, expect, it } from "bun:test";
import { escapeTheGhosts } from ".";

describe("789. Escape The Ghosts", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			escapeTheGhosts(
				[
					[1, 0],
					[0, 3],
				],
				[0, 1],
			),
		).toBeTrue();
		expect(escapeTheGhosts([[1, 0]], [2, 0])).toBeFalse();
		expect(escapeTheGhosts([[2, 0]], [1, 0])).toBeFalse();
	});
});

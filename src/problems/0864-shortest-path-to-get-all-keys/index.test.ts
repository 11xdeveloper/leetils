import { describe, expect, it } from "bun:test";
import { shortestPathToGetAllKeys as shortestPathAllKeys } from ".";

describe("864. Shortest Path to Get All Keys", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestPathAllKeys(["@.a..", "###.#", "b.A.B"])).toBe(8);
		expect(shortestPathAllKeys(["@..aA", "..B#.", "....b"])).toBe(6);
		expect(shortestPathAllKeys(["@Aa"])).toBe(-1);
	});

	it("needs no moves when there are no keys", () => {
		expect(shortestPathAllKeys(["@.#", "..."])).toBe(0);
	});

	it("goes back for a key when a lock blocks the way", () => {
		// b is behind lock A, and a is in the opposite direction.
		expect(shortestPathAllKeys(["a.@.A.b"])).toBe(2 + 6);
	});
});

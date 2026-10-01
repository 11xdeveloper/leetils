import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestDistanceToACharacter as shortestToChar } from ".";

describe("821. Shortest Distance to a Character", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestToChar("loveleetcode", "e")).toEqual([
			3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0,
		]);
		expect(shortestToChar("aaab", "b")).toEqual([3, 2, 1, 0]);
	});

	it("matches measuring to every occurrence on random inputs", () => {
		const random = createRandom(821);
		for (let run = 0; run < 1000; run++) {
			const s = `${random.string(random.int(0, 8), "abc")}c${random.string(random.int(0, 8), "abc")}`;
			const positions = [...s].flatMap((char, i) => (char === "c" ? [i] : []));
			expect(shortestToChar(s, "c")).toEqual(
				[...s].map((_, i) =>
					Math.min(...positions.map((p) => Math.abs(p - i))),
				),
			);
		}
	});
});

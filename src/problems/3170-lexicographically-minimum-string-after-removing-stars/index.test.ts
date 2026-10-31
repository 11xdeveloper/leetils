import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallyMinimumStringAfterRemovingStars as clearStars } from ".";

/** Tries every choice of deletion. */
const byBruteForce = (s: string): string => {
	let best: string | undefined;
	const search = (rest: string, i: number): void => {
		if (i === rest.length) {
			if (best === undefined || rest < best) best = rest;
			return;
		}
		if (rest[i] !== "*") {
			search(rest, i + 1);
			return;
		}
		const before = rest.slice(0, i);
		const smallest = [...before].sort()[0];
		for (let j = 0; j < i; j++)
			if (before[j] === smallest)
				search(
					before.slice(0, j) + before.slice(j + 1) + rest.slice(i + 1),
					i - 1,
				);
	};
	search(s, 0);
	return best ?? "";
};

describe("3170. Lexicographically Minimum String After Removing Stars", () => {
	it("solves the examples from the problem statement", () => {
		expect(clearStars("aaba*")).toBe("aab");
		expect(clearStars("abc")).toBe("abc");
	});

	it("matches trying every deletion on random strings", () => {
		const random = createRandom(3170);
		for (let run = 0; run < 300; run++) {
			let s = "";
			let letters = 0;
			for (let i = random.int(1, 9); i > 0; i--)
				if (letters > 0 && random.int(0, 2) === 0) {
					s += "*";
					letters--;
				} else {
					s += random.string(1, "abc");
					letters++;
				}
			expect(clearStars(s)).toBe(byBruteForce(s));
		}
	});
});

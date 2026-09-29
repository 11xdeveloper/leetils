import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { interleavingString } from ".";

/** Tries taking the next character from each string. */
const byRecursion = (a: string, b: string, c: string): boolean => {
	if (c === "") return a === "" && b === "";
	return (
		(a !== "" && a[0] === c[0] && byRecursion(a.slice(1), b, c.slice(1))) ||
		(b !== "" && b[0] === c[0] && byRecursion(a, b.slice(1), c.slice(1)))
	);
};

describe("97. Interleaving String", () => {
	it("solves the examples from the problem statement", () => {
		expect(interleavingString("aabcc", "dbbca", "aadbbcbcac")).toBeTrue();
		expect(interleavingString("aabcc", "dbbca", "aadbbbaccc")).toBeFalse();
		expect(interleavingString("", "", "")).toBeTrue();
	});

	it("rejects strings of the wrong total length", () => {
		expect(interleavingString("a", "b", "a")).toBeFalse();
		expect(interleavingString("a", "", "aa")).toBeFalse();
	});

	it("matches trying every interleaving on random inputs", () => {
		const random = createRandom(97);
		for (let run = 0; run < 1000; run++) {
			const a = random.string(random.int(0, 5), "ab");
			const b = random.string(random.int(0, 5), "ab");
			const c = random.string(a.length + b.length, "ab");
			expect(interleavingString(a, b, c)).toBe(byRecursion(a, b, c));
		}
	});
});

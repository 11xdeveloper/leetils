import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallySmallestStringAfterApplyingOperations as findLexSmallestString } from ".";

/** Breadth-first search over every reachable string. */
const byBruteForce = (s: string, a: number, b: number): string => {
	const seen = new Set([s]);
	const queue = [s];
	for (let i = 0; i < queue.length; i++) {
		const current = queue[i] ?? "";
		const added = [...current]
			.map((digit, j) => (j % 2 === 1 ? (Number(digit) + a) % 10 : digit))
			.join("");
		const rotated = current.slice(-b) + current.slice(0, -b);
		for (const next of [added, rotated]) {
			if (seen.has(next)) continue;
			seen.add(next);
			queue.push(next);
		}
	}
	return [...seen].sort()[0] ?? s;
};

describe("1625. Lexicographically Smallest String After Applying Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLexSmallestString("5525", 9, 2)).toBe("2050");
		expect(findLexSmallestString("74", 5, 1)).toBe("24");
		expect(findLexSmallestString("0011", 4, 2)).toBe("0011");
	});

	it("matches searching every reachable string on random inputs", () => {
		const random = createRandom(1625);
		for (let run = 0; run < 200; run++) {
			const n = 2 * random.int(1, 4);
			const s = random.string(n, "0123456789");
			const [a, b] = [random.int(1, 9), random.int(1, n - 1)];
			expect(findLexSmallestString(s, a, b)).toBe(byBruteForce(s, a, b));
		}
	});
});

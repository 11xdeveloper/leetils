import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumBinaryStringAfterChange as maximumBinaryString } from ".";

/** Searches every reachable string. */
const byBruteForce = (binary: string): string => {
	const seen = new Set([binary]);
	const queue = [binary];
	for (let i = 0; i < queue.length; i++) {
		const current = queue[i] ?? "";
		for (let j = 0; j + 1 < current.length; j++) {
			const pair = current.slice(j, j + 2);
			const replacement =
				pair === "00" ? "10" : pair === "10" ? "01" : undefined;
			if (!replacement) continue;
			const next = current.slice(0, j) + replacement + current.slice(j + 2);
			if (seen.has(next)) continue;
			seen.add(next);
			queue.push(next);
		}
	}
	return [...seen].sort().at(-1) ?? binary;
};

describe("1702. Maximum Binary String After Change", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumBinaryString("000110")).toBe("111011");
		expect(maximumBinaryString("01")).toBe("01");
	});

	it("matches searching every reachable string on random inputs", () => {
		const random = createRandom(1702);
		for (let run = 0; run < 200; run++) {
			const binary = random.string(random.int(1, 9), "01");
			expect(maximumBinaryString(binary)).toBe(byBruteForce(binary));
		}
	});
});

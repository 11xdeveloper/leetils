import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { determineIfTwoStringsAreClose as closeStrings } from ".";

/** Searches every string reachable by the two operations. */
const reachable = (word: string): Set<string> => {
	const seen = new Set([word]);
	const queue = [word];
	for (let i = 0; i < queue.length; i++) {
		const current = queue[i] ?? "";
		const next: string[] = [];
		for (let x = 0; x < current.length; x++) {
			for (let y = x + 1; y < current.length; y++) {
				const chars = [...current];
				[chars[x], chars[y]] = [chars[y] ?? "", chars[x] ?? ""];
				next.push(chars.join(""));
			}
		}
		for (const p of new Set(current)) {
			for (const q of new Set(current)) {
				next.push(
					[...current].map((c) => (c === p ? q : c === q ? p : c)).join(""),
				);
			}
		}
		for (const candidate of next) {
			if (seen.has(candidate)) continue;
			seen.add(candidate);
			queue.push(candidate);
		}
	}
	return seen;
};

describe("1657. Determine if Two Strings Are Close", () => {
	it("solves the examples from the problem statement", () => {
		expect(closeStrings("abc", "bca")).toBeTrue();
		expect(closeStrings("a", "aa")).toBeFalse();
		expect(closeStrings("cabbba", "abbccc")).toBeTrue();
	});

	it("matches searching every reachable string on random inputs", () => {
		const random = createRandom(1657);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 5);
			const [a, b] = [
				random.string(n, "abc"),
				random.string(random.int(n, n + 1), "abc"),
			];
			expect(closeStrings(a, b)).toBe(reachable(a).has(b));
		}
	});
});

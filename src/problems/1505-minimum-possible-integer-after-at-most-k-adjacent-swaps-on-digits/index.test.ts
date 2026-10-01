import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumPossibleIntegerAfterAtMostKAdjacentSwapsOnDigits as minInteger } from ".";

/** Breadth-first search over strings reachable within k swaps. */
const byBruteForce = (num: string, k: number): string => {
	let frontier = [num];
	const seen = new Set(frontier);
	for (let step = 0; step < k; step++) {
		const next: string[] = [];
		for (const s of frontier) {
			for (let i = 0; i + 1 < s.length; i++) {
				const t = s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2);
				if (seen.has(t)) continue;
				seen.add(t);
				next.push(t);
			}
		}
		frontier = next;
	}
	return [...seen].sort()[0] ?? num;
};

describe("1505. Minimum Possible Integer After at Most K Adjacent Swaps On Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(minInteger("4321", 4)).toBe("1342");
		expect(minInteger("100", 1)).toBe("010");
		expect(minInteger("36789", 1000)).toBe("36789");
	});

	it("sorts fully when k is large enough", () => {
		const num = "9876543210".repeat(3000);
		expect(minInteger(num, 10 ** 9)).toBe([...num].sort().join(""));
	});

	it("matches searching over swaps on random inputs", () => {
		const random = createRandom(1505);
		for (let run = 0; run < 200; run++) {
			const num = random.string(random.int(1, 6), "0123");
			const k = random.int(1, 6);
			expect(minInteger(num, k)).toBe(byBruteForce(num, k));
		}
	});
});

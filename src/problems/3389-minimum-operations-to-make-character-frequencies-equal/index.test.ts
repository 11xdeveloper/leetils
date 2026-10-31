import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToMakeCharacterFrequenciesEqual as makeStringGood } from ".";

/** Breadth-first search over letter counts. */
const byBruteForce = (s: string): number => {
	const letters = 5;
	const start = new Array<number>(letters).fill(0);
	for (const c of s)
		start[c.charCodeAt(0) - 97] = (start[c.charCodeAt(0) - 97] ?? 0) + 1;
	const good = (counts: number[]) =>
		new Set(counts.filter((c) => c > 0)).size <= 1;
	const seen = new Set([start.join()]);
	let frontier = [start];
	for (let steps = 0; ; steps++) {
		if (frontier.some(good)) return steps;
		const next: number[][] = [];
		const push = (counts: number[]) => {
			if (counts.some((c) => c > 6) || seen.has(counts.join())) return;
			seen.add(counts.join());
			next.push(counts);
		};
		for (const counts of frontier)
			for (let i = 0; i < letters; i++) {
				push(counts.map((c, j) => (j === i ? c + 1 : c)));
				if ((counts[i] ?? 0) > 0) {
					push(counts.map((c, j) => (j === i ? c - 1 : c)));
					if (i + 1 < letters)
						push(
							counts.map((c, j) => (j === i ? c - 1 : j === i + 1 ? c + 1 : c)),
						);
				}
			}
		frontier = next;
	}
};

describe("3389. Minimum Operations to Make Character Frequencies Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeStringGood("acab")).toBe(1);
		expect(makeStringGood("wddw")).toBe(0);
		expect(makeStringGood("aaabc")).toBe(2);
	});

	it("matches searching over letter counts on random strings", () => {
		const random = createRandom(3389);
		for (let run = 0; run < 100; run++) {
			const s = random.string(random.int(1, 7), "abc");
			expect(makeStringGood(s)).toBe(byBruteForce(s));
		}
	});
});

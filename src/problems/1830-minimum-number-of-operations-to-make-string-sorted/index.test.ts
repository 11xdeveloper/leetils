import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfOperationsToMakeStringSorted as makeStringSorted } from ".";

/** Applies the operation from the problem statement until the string is sorted. */
const bySimulation = (s: string): number => {
	const chars = [...s];
	let operations = 0;
	for (;;) {
		let i = chars.length - 1;
		while (i > 0 && (chars[i] ?? "") >= (chars[i - 1] ?? "")) i--;
		if (i === 0) return operations;
		let j = chars.length - 1;
		while ((chars[j] ?? "") >= (chars[i - 1] ?? "")) j--;
		[chars[i - 1], chars[j]] = [chars[j] ?? "", chars[i - 1] ?? ""];
		const tail = chars.splice(i).reverse();
		chars.push(...tail);
		operations++;
	}
};

describe("1830. Minimum Number of Operations to Make String Sorted", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeStringSorted("cba")).toBe(5);
		expect(makeStringSorted("aabaa")).toBe(2);
	});

	it("matches applying the operation on random strings", () => {
		const random = createRandom(1830);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 7), "abcd");
			expect(makeStringSorted(s)).toBe(bySimulation(s));
		}
	});

	it("handles long strings", () => {
		expect(
			makeStringSorted("zyxwvutsrqponmlkjihgfedcba".repeat(100)),
		).toBeLessThan(1_000_000_007);
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeKDigits } from ".";

/** Tries every set of k positions to remove. */
const byBruteForce = (num: string, k: number): string => {
	let best: bigint | undefined;
	for (let mask = 0; mask < 1 << num.length; mask++) {
		let removed = 0;
		for (let rest = mask; rest > 0; rest &= rest - 1) removed++;
		if (removed !== k) continue;
		const kept = [...num].filter((_, i) => !(mask & (1 << i))).join("");
		const value = BigInt(kept === "" ? "0" : kept);
		if (best === undefined || value < best) best = value;
	}
	return String(best ?? 0n);
};

describe("402. Remove K Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeKDigits("1432219", 3)).toBe("1219");
		expect(removeKDigits("10200", 1)).toBe("200");
		expect(removeKDigits("10", 2)).toBe("0");
	});

	it("removes from the end when the digits never decrease", () => {
		expect(removeKDigits("12345", 2)).toBe("123");
	});

	it("matches trying every removal on random inputs", () => {
		const random = createRandom(402);
		for (let run = 0; run < 500; run++) {
			const num =
				String(random.int(1, 9)) +
				random.string(random.int(0, 9), "0123456789");
			const k = random.int(1, num.length);
			expect(removeKDigits(num, k)).toBe(byBruteForce(num, k));
		}
	});
});

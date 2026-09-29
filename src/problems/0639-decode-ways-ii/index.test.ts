import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { decodeWays } from "../0091-decode-ways";
import { decodeWaysII as numDecodings } from ".";

/** Replaces every * with each digit from 1 to 9 and sums Decode Ways over the results. */
const byExpanding = (s: string): number => {
	const star = s.indexOf("*");
	if (star === -1) return decodeWays(s);
	let total = 0;
	for (let digit = 1; digit <= 9; digit++)
		total += byExpanding(s.slice(0, star) + digit + s.slice(star + 1));
	return total;
};

describe("639. Decode Ways II", () => {
	it("solves the examples from the problem statement", () => {
		expect(numDecodings("*")).toBe(9);
		expect(numDecodings("1*")).toBe(18);
		expect(numDecodings("2*")).toBe(15);
	});

	it("matches expanding every * on random inputs", () => {
		const random = createRandom(639);
		for (let run = 0; run < 1000; run++) {
			let s = random.string(random.int(1, 8), "0123456789");
			for (let stars = random.int(0, 3); stars > 0; stars--) {
				const at = random.int(0, s.length - 1);
				s = `${s.slice(0, at)}*${s.slice(at + 1)}`;
			}
			expect(numDecodings(s)).toBe(byExpanding(s));
		}
	});

	it("handles long inputs modulo 10^9 + 7", () => {
		expect(numDecodings("*".repeat(100_000))).toBeWithin(0, 1_000_000_007);
	});
});

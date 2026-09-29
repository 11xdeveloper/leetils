import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bullsAndCows } from ".";

const byCounting = (secret: string, guess: string): string => {
	const bulls = [...secret].filter((d, i) => d === guess[i]).length;
	let matched = 0;
	for (const digit of "0123456789") {
		const count = (s: string) => [...s].filter((d) => d === digit).length;
		matched += Math.min(count(secret), count(guess));
	}
	return `${bulls}A${matched - bulls}B`;
};

describe("299. Bulls and Cows", () => {
	it("solves the examples from the problem statement", () => {
		expect(bullsAndCows("1807", "7810")).toBe("1A3B");
		expect(bullsAndCows("1123", "0111")).toBe("1A1B");
	});

	it("scores exact and completely wrong guesses", () => {
		expect(bullsAndCows("1234", "1234")).toBe("4A0B");
		expect(bullsAndCows("1234", "5678")).toBe("0A0B");
	});

	it("matches counting shared digits on random inputs", () => {
		const random = createRandom(299);
		for (let run = 0; run < 2000; run++) {
			const n = random.int(1, 8);
			const secret = random.string(n, "0123");
			const guess = random.string(n, "0123");
			expect(bullsAndCows(secret, guess)).toBe(byCounting(secret, guess));
		}
	});
});

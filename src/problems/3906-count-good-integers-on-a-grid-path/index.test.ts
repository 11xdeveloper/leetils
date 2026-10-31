import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countGoodIntegersOnAGridPath as countGoodIntegersOnPath } from ".";

/** Checks every number's path digits. */
const byBruteForce = (l: number, r: number, directions: string): number => {
	let count = 0;
	for (let x = l; x <= r; x++) {
		const digits = String(x).padStart(16, "0");
		let [row, column] = [0, 0];
		const seen = [digits[0] ?? ""];
		for (const step of directions) {
			if (step === "D") row++;
			else column++;
			seen.push(digits[row * 4 + column] ?? "");
		}
		if (seen.every((d, i) => i === 0 || (seen[i - 1] ?? "") <= d)) count++;
	}
	return count;
};

describe("3906. Count Good Integers on a Grid Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodIntegersOnPath(8, 10, "DDDRRR")).toBe(2);
		expect(countGoodIntegersOnPath(123456789, 123456790, "DDRRDR")).toBe(1);
		expect(
			countGoodIntegersOnPath(1288561398769758, 1288561398769758, "RRRDDD"),
		).toBe(0);
	});

	it("matches checking every number on random ranges", () => {
		const random = createRandom(3906);
		const paths = ["DDDRRR", "RRRDDD", "DRDRDR", "RDRDRD"];
		for (let run = 0; run < 40; run++) {
			const l = random.int(1, 50000);
			const r = l + random.int(0, 3000);
			const directions = paths[random.int(0, paths.length - 1)] ?? "";
			expect(countGoodIntegersOnPath(l, r, directions)).toBe(
				byBruteForce(l, r, directions),
			);
		}
	});
});

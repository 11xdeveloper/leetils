import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ambiguousCoordinates } from ".";

/** A number is written without extra zeros exactly when it round-trips through parsing. */
const isCanonical = (text: string): boolean => String(Number(text)) === text;

describe("816. Ambiguous Coordinates", () => {
	it("solves the examples from the problem statement", () => {
		expect(ambiguousCoordinates("(123)").sort()).toEqual([
			"(1, 2.3)",
			"(1, 23)",
			"(1.2, 3)",
			"(12, 3)",
		]);
		expect(ambiguousCoordinates("(0123)").sort()).toEqual([
			"(0, 1.23)",
			"(0, 12.3)",
			"(0, 123)",
			"(0.1, 2.3)",
			"(0.1, 23)",
			"(0.12, 3)",
		]);
		expect(ambiguousCoordinates("(00011)").sort()).toEqual([
			"(0, 0.011)",
			"(0.001, 1)",
		]);
	});

	it("matches trying every placement of comma and points on random inputs", () => {
		const random = createRandom(816);
		for (let run = 0; run < 500; run++) {
			const digits = random.string(random.int(2, 7), "0012");
			const expected: string[] = [];
			for (let split = 1; split < digits.length; split++) {
				const withPoints = (part: string) => [
					part,
					...Array.from(
						{ length: part.length - 1 },
						(_, i) => `${part.slice(0, i + 1)}.${part.slice(i + 1)}`,
					),
				];
				for (const x of withPoints(digits.slice(0, split))) {
					for (const y of withPoints(digits.slice(split)))
						if (isCanonical(x) && isCanonical(y)) expected.push(`(${x}, ${y})`);
				}
			}
			expect(ambiguousCoordinates(`(${digits})`).sort()).toEqual(
				expected.sort(),
			);
		}
	});
});

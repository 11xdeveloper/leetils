import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { satisfiabilityOfEqualityEquations as equationsPossible } from ".";

/** Tries every assignment of values 0 to 3 to the letters used. */
const byBruteForce = (equations: string[]): boolean => {
	const letters = [
		...new Set(equations.flatMap((e) => [e.charAt(0), e.charAt(3)])),
	];
	for (let code = 0; code < 4 ** letters.length; code++) {
		const value = new Map(
			letters.map((letter, i) => [letter, Math.floor(code / 4 ** i) % 4]),
		);
		if (
			equations.every(
				(e) =>
					(value.get(e.charAt(0)) === value.get(e.charAt(3))) ===
					(e.charAt(1) === "="),
			)
		)
			return true;
	}
	return false;
};

describe("990. Satisfiability of Equality Equations", () => {
	it("solves the examples from the problem statement", () => {
		expect(equationsPossible(["a==b", "b!=a"])).toBeFalse();
		expect(equationsPossible(["b==a", "a==b"])).toBeTrue();
		expect(equationsPossible(["a!=a"])).toBeFalse();
	});

	it("matches trying every assignment on random equations", () => {
		const random = createRandom(990);
		for (let run = 0; run < 500; run++) {
			const equations = Array.from(
				{ length: random.int(1, 6) },
				() =>
					`${random.string(1, "abcd")}${random.int(0, 1) ? "==" : "!="}${random.string(1, "abcd")}`,
			);
			expect(equationsPossible(equations)).toBe(byBruteForce(equations));
		}
	});
});

import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { evaluateDivision } from ".";

describe("399. Evaluate Division", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			evaluateDivision(
				[
					["a", "b"],
					["b", "c"],
				],
				[2, 3],
				[
					["a", "c"],
					["b", "a"],
					["a", "e"],
					["a", "a"],
					["x", "x"],
				],
			),
		).toEqual([6, 0.5, -1, 1, -1]);
		expect(
			evaluateDivision(
				[["a", "b"]],
				[0.5],
				[
					["a", "b"],
					["b", "a"],
					["a", "c"],
					["x", "y"],
				],
			),
		).toEqual([0.5, 2, -1, -1]);
	});

	it("matches hidden variable values on random consistent systems", () => {
		const random = createRandom(399);
		const names = ["a", "b", "c", "d", "e", "f"];
		for (let run = 0; run < 300; run++) {
			const hidden = new Map(names.map((name) => [name, random.int(1, 9)]));
			const equations = Array.from({ length: random.int(1, 6) }, () => [
				names[random.int(0, 5)] ?? "a",
				names[random.int(0, 5)] ?? "a",
			]);
			const values = equations.map(
				([x = "a", y = "a"]) => (hidden.get(x) ?? 1) / (hidden.get(y) ?? 1),
			);
			const queries = Array.from({ length: 10 }, () => [
				names[random.int(0, 5)] ?? "a",
				names[random.int(0, 5)] ?? "a",
			]);

			// Which variables are connected, found by repeatedly merging groups.
			const group = new Map(names.map((name) => [name, name]));
			for (let changed = true; changed; ) {
				changed = false;
				for (const [x = "a", y = "a"] of equations) {
					const [gx, gy] = [group.get(x) ?? x, group.get(y) ?? y];
					if (gx !== gy) {
						for (const [k, v] of group) if (v === gy) group.set(k, gx);
						changed = true;
					}
				}
			}
			const seen = new Set(equations.flat());

			const answers = evaluateDivision(equations, values, queries);
			for (const [i, [c = "a", d = "a"]] of queries.entries()) {
				if (!seen.has(c) || !seen.has(d) || group.get(c) !== group.get(d))
					expect(answers[i]).toBe(-1);
				else
					expect(answers[i]).toBeCloseTo(
						(hidden.get(c) ?? 1) / (hidden.get(d) ?? 1),
						9,
					);
			}
		}
	});
});

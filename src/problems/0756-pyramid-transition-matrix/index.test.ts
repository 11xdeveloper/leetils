import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pyramidTransitionMatrix as pyramidTransition } from ".";

/** Builds every possible row above, level by level. */
const byLevels = (bottom: string, allowed: string[]): boolean => {
	let rows = new Set([bottom]);
	while (rows.size > 0) {
		const [first = ""] = rows;
		if (first.length === 1) return true;
		const next = new Set<string>();
		for (const row of rows) {
			let partial = [""];
			for (let i = 0; i + 1 < row.length; i++) {
				const options = allowed
					.filter((pattern) => pattern.startsWith(row.slice(i, i + 2)))
					.map((pattern) => pattern.charAt(2));
				partial = partial.flatMap((prefix) =>
					options.map((option) => prefix + option),
				);
			}
			for (const candidate of partial) next.add(candidate);
		}
		rows = next;
	}
	return false;
};

describe("756. Pyramid Transition Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(pyramidTransition("BCD", ["BCC", "CDE", "CEA", "FFF"])).toBeTrue();
		expect(
			pyramidTransition("AAAA", ["AAB", "AAC", "BCD", "BBE", "DEF"]),
		).toBeFalse();
	});

	it("matches building every row on random inputs", () => {
		const random = createRandom(756);
		for (let run = 0; run < 500; run++) {
			const bottom = random.string(random.int(2, 5), "ABC");
			const allowed = [
				...new Set(
					Array.from({ length: random.int(0, 10) }, () =>
						random.string(3, "ABC"),
					),
				),
			];
			expect(pyramidTransition(bottom, allowed)).toBe(
				byLevels(bottom, allowed),
			);
		}
	});
});

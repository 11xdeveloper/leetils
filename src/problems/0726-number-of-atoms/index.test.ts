import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { numberOfAtoms as countOfAtoms } from ".";

/** A random formula alongside the element counts it contains. */
const randomFormula = (
	random: Random,
	depth: number,
): [string, Map<string, number>] => {
	let text = "";
	const counts = new Map<string, number>();
	for (let parts = random.int(1, 3); parts > 0; parts--) {
		if (depth > 0 && random.int(0, 2) === 0) {
			const [inner, innerCounts] = randomFormula(random, depth - 1);
			const multiplier = random.int(1, 3);
			text += `(${inner})${multiplier === 1 && random.int(0, 1) ? "" : multiplier}`;
			for (const [element, count] of innerCounts)
				counts.set(element, (counts.get(element) ?? 0) + count * multiplier);
		} else {
			const element = ["H", "He", "O", "Mg", "Na"][random.int(0, 4)] ?? "H";
			const count = random.int(1, 12);
			text += `${element}${count === 1 && random.int(0, 1) ? "" : count}`;
			counts.set(element, (counts.get(element) ?? 0) + count);
		}
	}
	return [text, counts];
};

describe("726. Number of Atoms", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOfAtoms("H2O")).toBe("H2O");
		expect(countOfAtoms("Mg(OH)2")).toBe("H2MgO2");
		expect(countOfAtoms("K4(ON(SO3)2)2")).toBe("K4N2O14S4");
	});

	it("counts the atoms of random nested formulas", () => {
		const random = createRandom(726);
		for (let run = 0; run < 1000; run++) {
			const [formula, counts] = randomFormula(random, 3);
			const expected = [...counts.keys()]
				.sort()
				.map((element) =>
					(counts.get(element) ?? 0) > 1
						? `${element}${counts.get(element)}`
						: element,
				)
				.join("");
			expect(countOfAtoms(formula)).toBe(expected);
		}
	});
});

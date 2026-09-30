import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makingFileNamesUnique as getFolderNames } from ".";

/** Tries suffixes from 1 every time. */
const byBruteForce = (names: string[]): string[] => {
	const taken = new Set<string>();
	return names.map((name) => {
		let given = name;
		for (let k = 1; taken.has(given); k++) given = `${name}(${k})`;
		taken.add(given);
		return given;
	});
};

describe("1487. Making File Names Unique", () => {
	it("solves the examples from the problem statement", () => {
		expect(getFolderNames(["pes", "fifa", "gta", "pes(2019)"])).toEqual([
			"pes",
			"fifa",
			"gta",
			"pes(2019)",
		]);
		expect(getFolderNames(["gta", "gta(1)", "gta", "avalon"])).toEqual([
			"gta",
			"gta(1)",
			"gta(2)",
			"avalon",
		]);
		expect(
			getFolderNames([
				"onepiece",
				"onepiece(1)",
				"onepiece(2)",
				"onepiece(3)",
				"onepiece",
			]),
		).toEqual([
			"onepiece",
			"onepiece(1)",
			"onepiece(2)",
			"onepiece(3)",
			"onepiece(4)",
		]);
	});

	it("handles suffixed names clashing in turn", () => {
		expect(getFolderNames(["a", "a", "a(1)"])).toEqual([
			"a",
			"a(1)",
			"a(1)(1)",
		]);
	});

	it("matches trying suffixes from 1 on random inputs", () => {
		const random = createRandom(1487);
		const pool = ["a", "b", "a(1)", "a(2)", "b(1)", "a(1)(1)"];
		for (let run = 0; run < 300; run++) {
			const names = Array.from(
				{ length: random.int(1, 10) },
				() => pool[random.int(0, pool.length - 1)] ?? "a",
			);
			expect(getFolderNames(names)).toEqual(byBruteForce(names));
		}
	});
});

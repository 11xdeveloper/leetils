import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validWordSquare } from ".";

/** Row k must equal column k, read top to bottom until it runs out, with no gaps. */
const byColumns = (words: string[]): boolean => {
	const size = Math.max(words.length, ...words.map((w) => w.length));
	for (let k = 0; k < size; k++) {
		const column = words.map((w) => w[k]);
		while (column.length > 0 && column.at(-1) === undefined) column.pop();
		if (
			column.join("|") !== [...(words[k] ?? "")].join("|") ||
			column.includes(undefined)
		)
			return false;
	}
	return true;
};

describe("422. Valid Word Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(validWordSquare(["abcd", "bnrt", "crmy", "dtye"])).toBeTrue();
		expect(validWordSquare(["abcd", "bnrt", "crm", "dt"])).toBeTrue();
		expect(validWordSquare(["ball", "area", "read", "lady"])).toBeFalse();
	});

	it("rejects rows longer than their column", () => {
		expect(validWordSquare(["abc", "b"])).toBeFalse();
		expect(validWordSquare(["a", "b"])).toBeFalse();
	});

	it("accepts squares built from a random symmetric grid", () => {
		const random = createRandom(422);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 6);
			const grid = Array.from({ length: n }, () =>
				new Array<string>(n).fill(""),
			);
			for (let r = 0; r < n; r++) {
				for (let c = r; c < n; c++) {
					const letter = random.string(1, "abc");
					(grid[r] ?? [])[c] = letter;
					(grid[c] ?? [])[r] = letter;
				}
			}
			expect(validWordSquare(grid.map((row) => row.join("")))).toBeTrue();
		}
	});

	it("matches comparing rows with columns on random word lists", () => {
		const random = createRandom(4220);
		for (let run = 0; run < 2000; run++) {
			const words = Array.from({ length: random.int(1, 4) }, () =>
				random.string(random.int(1, 4), "ab"),
			);
			expect(validWordSquare(words)).toBe(byColumns(words));
		}
	});
});

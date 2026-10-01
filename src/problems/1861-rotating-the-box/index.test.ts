import { describe, expect, it } from "bun:test";
import { rotatingTheBox as rotateTheBox } from ".";

const grid = (rows: string[]) => rows.map((row) => [...row]);

describe("1861. Rotating the Box", () => {
	it("solves the examples from the problem statement", () => {
		expect(rotateTheBox(grid(["#.#"]))).toEqual(grid([".", "#", "#"]));
		expect(rotateTheBox(grid(["#.*.", "##*."]))).toEqual(
			grid(["#.", "##", "**", ".."]),
		);
		expect(rotateTheBox(grid(["##*.*.", "###*..", "###.#."]))).toEqual(
			grid([".##", ".##", "##*", "#*.", "#.*", "#.."]),
		);
	});
});

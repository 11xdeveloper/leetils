import { describe, expect, it } from "bun:test";
import { goalParserInterpretation as interpret } from ".";

describe("1678. Goal Parser Interpretation", () => {
	it("solves the examples from the problem statement", () => {
		expect(interpret("G()(al)")).toBe("Goal");
		expect(interpret("G()()()()(al)")).toBe("Gooooal");
		expect(interpret("(al)G(al)()()G")).toBe("alGalooG");
	});
});

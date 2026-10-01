import { describe, expect, it } from "bun:test";
import { htmlEntityParser as entityParser } from ".";

describe("1410. HTML Entity Parser", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			entityParser("&amp; is an HTML entity but &ambassador; is not."),
		).toBe("& is an HTML entity but &ambassador; is not.");
		expect(entityParser("and I quote: &quot;...&quot;")).toBe(
			'and I quote: "..."',
		);
	});

	it("decodes every entity", () => {
		expect(entityParser("&quot;&apos;&amp;&gt;&lt;&frasl;")).toBe(`"'&></`);
	});

	it("doesn't decode twice", () => {
		expect(entityParser("&amp;gt;")).toBe("&gt;");
		expect(entityParser("&&gt;")).toBe("&>");
	});
});

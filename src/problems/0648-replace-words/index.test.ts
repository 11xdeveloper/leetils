import { describe, expect, it } from "bun:test";
import { replaceWords } from ".";

describe("648. Replace Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			replaceWords(
				["cat", "bat", "rat"],
				"the cattle was rattled by the battery",
			),
		).toBe("the cat was rat by the bat");
		expect(replaceWords(["a", "b", "c"], "aadsfasf absbs bbab cadsfafs")).toBe(
			"a a b c",
		);
	});

	it("prefers the shortest root and leaves unmatched words alone", () => {
		expect(replaceWords(["catt", "cat", "ca"], "cattle")).toBe("ca");
		expect(replaceWords(["xyz"], "hello world")).toBe("hello world");
		expect(replaceWords(["hello"], "hell")).toBe("hell");
	});
});

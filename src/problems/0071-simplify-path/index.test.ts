import { describe, expect, it } from "bun:test";
import { posix } from "node:path";
import { createRandom } from "../../testing/random";
import { simplifyPath } from ".";

describe("71. Simplify Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(simplifyPath("/home/")).toBe("/home");
		expect(simplifyPath("/home//foo/")).toBe("/home/foo");
		expect(simplifyPath("/home/user/Documents/../Pictures")).toBe(
			"/home/user/Pictures",
		);
		expect(simplifyPath("/../")).toBe("/");
		expect(simplifyPath("/.../a/../b/c/../d/./")).toBe("/.../b/d");
	});

	it("treats names made of dots, other than . and .., as directories", () => {
		expect(simplifyPath("/..../.../..")).toBe("/....");
	});

	it("allows underscores and digits in names", () => {
		expect(simplifyPath("/a_1/./b_2/")).toBe("/a_1/b_2");
	});

	it("agrees with Node's posix.normalize on random paths", () => {
		const random = createRandom(71);
		const parts = ["a", "b", ".", "..", "...", ""];
		for (let run = 0; run < 1000; run++) {
			const path = `/${Array.from({ length: random.int(0, 8) }, () => parts[random.int(0, parts.length - 1)]).join("/")}`;
			const normalized = posix.normalize(path);
			const expected =
				normalized.length > 1 && normalized.endsWith("/")
					? normalized.slice(0, -1)
					: normalized;
			expect(simplifyPath(path)).toBe(expected);
		}
	});
});

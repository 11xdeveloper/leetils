import { describe, expect, it } from "bun:test";
import { DesignSql as SQL } from ".";

describe("2408. Design SQL", () => {
	it("solves the example from the problem statement", () => {
		const sql = new SQL(["one", "two", "three"], [2, 3, 1]);
		sql.insertRow("two", ["first", "second", "third"]);
		expect(sql.selectCell("two", 1, 3)).toBe("third");
		sql.insertRow("two", ["fourth", "fifth", "sixth"]);
		sql.deleteRow("two", 1);
		expect(sql.selectCell("two", 2, 2)).toBe("fifth");
	});

	it("doesn't reuse deleted ids", () => {
		const sql = new SQL(["t"], [1]);
		sql.insertRow("t", ["a"]);
		sql.deleteRow("t", 1);
		sql.insertRow("t", ["b"]);
		expect(sql.selectCell("t", 2, 1)).toBe("b");
		expect(sql.selectCell("t", 1, 1)).toBe("");
	});
});

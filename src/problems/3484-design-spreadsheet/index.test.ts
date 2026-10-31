import { describe, expect, it } from "bun:test";
import { DesignSpreadsheet as Spreadsheet } from ".";

describe("3484. Design Spreadsheet", () => {
	it("solves the examples from the problem statement", () => {
		const sheet = new Spreadsheet(3);
		expect(sheet.getValue("=5+7")).toBe(12);
		sheet.setCell("A1", 10);
		expect(sheet.getValue("=A1+6")).toBe(16);
		sheet.setCell("B2", 15);
		expect(sheet.getValue("=A1+B2")).toBe(25);
		sheet.resetCell("A1");
		expect(sheet.getValue("=A1+B2")).toBe(15);
	});
});

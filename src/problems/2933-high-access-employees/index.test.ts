import { describe, expect, it } from "bun:test";
import { highAccessEmployees as findHighAccessEmployees } from ".";

describe("2933. High-Access Employees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findHighAccessEmployees([
				["a", "0549"],
				["b", "0457"],
				["a", "0532"],
				["a", "0621"],
				["b", "0540"],
			]).sort(),
		).toEqual(["a"]);
		expect(
			findHighAccessEmployees([
				["d", "0002"],
				["c", "0808"],
				["c", "0829"],
				["e", "0215"],
				["d", "1508"],
				["d", "1444"],
				["d", "1410"],
				["c", "0809"],
			]).sort(),
		).toEqual(["c", "d"]);
		expect(
			findHighAccessEmployees([
				["cd", "1025"],
				["ab", "1025"],
				["cd", "1046"],
				["cd", "1055"],
				["ab", "1124"],
				["ab", "1120"],
			]).sort(),
		).toEqual(["ab", "cd"]);
	});
});

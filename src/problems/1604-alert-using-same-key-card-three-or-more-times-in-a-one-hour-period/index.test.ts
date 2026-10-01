import { describe, expect, it } from "bun:test";
import { alertUsingSameKeyCardThreeOrMoreTimesInAOneHourPeriod as alertNames } from ".";

describe("1604. Alert Using Same Key-Card Three or More Times in a One Hour Period", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			alertNames(
				["daniel", "daniel", "daniel", "luis", "luis", "luis", "luis"],
				["10:00", "10:40", "11:00", "09:00", "11:00", "13:00", "15:00"],
			),
		).toEqual(["daniel"]);
		expect(
			alertNames(
				["alice", "alice", "alice", "bob", "bob", "bob", "bob"],
				["12:01", "12:00", "18:00", "21:00", "21:20", "21:30", "23:00"],
			),
		).toEqual(["bob"]);
	});

	it("doesn't wrap around midnight", () => {
		expect(alertNames(["a", "a", "a"], ["23:50", "00:10", "00:20"])).toEqual(
			[],
		);
		expect(alertNames(["a", "a", "a"], ["22:51", "23:00", "23:52"])).toEqual(
			[],
		);
	});
});

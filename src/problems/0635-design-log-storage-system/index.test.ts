import { describe, expect, it } from "bun:test";
import { DesignLogStorageSystem as LogSystem } from ".";

describe("635. Design Log Storage System", () => {
	it("solves the example from the problem statement", () => {
		const logs = new LogSystem();
		logs.put(1, "2017:01:01:23:59:59");
		logs.put(2, "2017:01:01:22:59:59");
		logs.put(3, "2016:01:01:00:00:00");
		expect(
			logs
				.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year")
				.sort(),
		).toEqual([1, 2, 3]);
		expect(
			logs
				.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour")
				.sort(),
		).toEqual([1, 2]);
	});

	it("includes both ends at every granularity", () => {
		const logs = new LogSystem();
		logs.put(1, "2010:06:15:12:30:45");
		for (const granularity of [
			"Year",
			"Month",
			"Day",
			"Hour",
			"Minute",
			"Second",
		]) {
			expect(
				logs.retrieve(
					"2010:06:15:12:30:45",
					"2010:06:15:12:30:45",
					granularity,
				),
			).toEqual([1]);
		}
		expect(
			logs.retrieve("2010:06:15:12:30:46", "2011:01:01:00:00:00", "Second"),
		).toEqual([]);
		expect(
			logs.retrieve("2010:06:15:12:30:46", "2011:01:01:00:00:00", "Minute"),
		).toEqual([1]);
		expect(
			logs.retrieve("2010:07:01:00:00:00", "2011:01:01:00:00:00", "Month"),
		).toEqual([]);
	});
});

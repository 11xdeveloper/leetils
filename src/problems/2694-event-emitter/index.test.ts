import { describe, expect, it } from "bun:test";
import { EventEmitter } from ".";

describe("2694. Event Emitter", () => {
	it("solves the examples from the problem statement", () => {
		const a = new EventEmitter();
		expect(a.emit("firstEvent")).toEqual([]);
		a.subscribe("firstEvent", () => 5);
		a.subscribe("firstEvent", () => 6);
		expect(a.emit("firstEvent")).toEqual([5, 6]);

		const b = new EventEmitter();
		b.subscribe("firstEvent", (...args: number[]) => args.join(","));
		expect(b.emit("firstEvent", [1, 2, 3])).toEqual(["1,2,3"]);
		expect(b.emit("firstEvent", [3, 4, 6])).toEqual(["3,4,6"]);

		const c = new EventEmitter();
		const sub = c.subscribe("firstEvent", (...args: number[]) =>
			args.join(","),
		);
		expect(c.emit("firstEvent", [1, 2, 3])).toEqual(["1,2,3"]);
		sub.unsubscribe();
		expect(c.emit("firstEvent", [4, 5, 6])).toEqual([]);

		const d = new EventEmitter();
		const sub1 = d.subscribe("firstEvent", (x: number) => x + 1);
		d.subscribe("firstEvent", (x: number) => x + 2);
		sub1.unsubscribe();
		expect(d.emit("firstEvent", [5])).toEqual([7]);
	});

	it("keeps duplicate callbacks separate", () => {
		const emitter = new EventEmitter();
		const callback = () => 1;
		const first = emitter.subscribe("e", callback);
		emitter.subscribe("e", callback);
		first.unsubscribe();
		expect(emitter.emit("e")).toEqual([1]);
	});
});

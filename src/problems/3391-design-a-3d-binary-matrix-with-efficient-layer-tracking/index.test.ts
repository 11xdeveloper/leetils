import { describe, expect, it } from "bun:test";
import { DesignA3dBinaryMatrixWithEfficientLayerTracking as Matrix3D } from ".";

describe("3391. Design a 3D Binary Matrix with Efficient Layer Tracking", () => {
	it("solves the examples from the problem statement", () => {
		const a = new Matrix3D(3);
		a.setCell(0, 0, 0);
		expect(a.largestMatrix()).toBe(0);
		a.setCell(1, 1, 2);
		expect(a.largestMatrix()).toBe(1);
		a.setCell(0, 0, 1);
		expect(a.largestMatrix()).toBe(0);

		const b = new Matrix3D(4);
		b.setCell(2, 1, 1);
		b.unsetCell(2, 1, 1);
		expect(b.largestMatrix()).toBe(3);
	});

	it("ignores setting a set cell twice", () => {
		const m = new Matrix3D(2);
		m.setCell(0, 0, 0);
		m.setCell(0, 0, 0);
		m.setCell(1, 0, 0);
		expect(m.largestMatrix()).toBe(1);
	});
});

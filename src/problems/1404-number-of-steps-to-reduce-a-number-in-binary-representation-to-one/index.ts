/**
 * 1404. Number of Steps to Reduce a Number in Binary Representation to One
 *
 * Counts the steps to reduce the binary number `s` to 1, halving even
 * numbers and adding 1 to odd ones.
 *
 * Reads the bits from the right with a carry. A 0 bit (after the carry)
 * costs one halving; a 1 bit costs an addition and a halving and leaves a
 * carry. The leading 1 only costs a halving if a carry reaches it.
 *
 * @see https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfStepsToReduceANumberInBinaryRepresentationToOne("1101"); // 6
 */
export const numberOfStepsToReduceANumberInBinaryRepresentationToOne = (
	s: string,
): number => {
	let [steps, carry] = [0, 0];
	for (let i = s.length - 1; i > 0; i--) {
		const bit = Number(s[i]) + carry;
		if (bit === 1) {
			steps += 2;
			carry = 1;
		} else {
			steps += 1;
		}
	}
	return steps + carry;
};

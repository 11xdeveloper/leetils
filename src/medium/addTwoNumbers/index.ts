import { ListNode } from "../../lib/ListNode";

export const addTwoNumbers = (
	l1: ListNode | null,
	l2: ListNode | null,
): ListNode | null => {
	const dummy = new ListNode();
	let temp = dummy;
	let carry = 0;

	let n1 = l1;
	let n2 = l2;

	while (n1 || n2 || carry) {
		const val1 = n1 ? n1.val : 0;
		const val2 = n2 ? n2.val : 0;

		const sum = val1 + val2 + carry;
		carry = Math.floor(sum / 10);
		temp.next = new ListNode(sum % 10);
		temp = temp.next;

		if (n1) n1 = n1.next;
		if (n2) n2 = n2.next;
	}

	return dummy.next;
};

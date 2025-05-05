import { ListNode } from "../../lib/ListNode";

/**
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 * 
 * @param l1 - The first number as a linked list in reverse order
 * @param l2 - The second number as a linked list in reverse order
 * @returns The sum as a linked list in reverse order
 * 
 * @example
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807
 * 
 * @example
 * Input: l1 = [0], l2 = [0]
 * Output: [0]
 * 
 * @example
 * Input: l1 = [9,9,9,9], l2 = [9,9,9]
 * Output: [8,9,9,0,1]
 * Explanation: 9999 + 999 = 10998
 * 
 * @timeComplexity O(max(n,m)) - where n and m are the lengths of the input lists
 * @spaceComplexity O(max(n,m)) - to store the result list
 */
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

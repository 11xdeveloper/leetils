export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val: number, next?: ListNode) {
        this.val = val;
        this.next = next ? next : null;
    }
}

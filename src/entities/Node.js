export default class TreeNode {
	constructor(label, key) {
		this.label = label;
		this.key = this.generateKey(key);
		this.children = [];
	}
	generateKey(str) {
		const parts = str.split(".");
		const lastNumber = parseFloat(parts[parts.length - 1]);
		const incrementedNumber = lastNumber + 1;
		parts[parts.length - 1] = incrementedNumber.toString();
		const result = parts.join(".");
		return result;
	}
}

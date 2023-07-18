import React, { useState } from "react";
import "./index.css";
import treeData from "./data.json";

const map1 = new Map([
	[0, "1"],
	[1, "1.1"],
	[2, "1.2.1"],
	[3, "1.2.2.1"],
]);

export const create = (label, key) => ({
	key,
	label,
	children: [],
});

class Node {
	constructor(label, key) {
		this.label = label;
		this.key = key;
		this.children = [];
	}
}

export const generateKey = (str) => {
	const parts = str.split(".");
	const lastNumber = parseFloat(parts[parts.length - 1]);
	const incrementedNumber = lastNumber + 1;
	parts[parts.length - 1] = incrementedNumber.toString();
	const result = parts.join(".");
	return result;
};

const lastInGroup = (nodeIndex, nodeArr) => {
	const lastNodeInGroup = nodeArr[nodeArr.length - 1];
	return lastNodeInGroup.label === "root" ? false : nodeArr.indexOf(lastNodeInGroup) === nodeIndex;
};

function findParentNodeByLabel(treeData, label, parent = null) {
	for (let i = 0; i < treeData.length; i++) {
		const currentNode = treeData[i];
		if (currentNode.label === label) {
			return parent;
		}
		if (currentNode.children && currentNode.children.length > 0) {
			const foundParent = findParentNodeByLabel(currentNode.children, label, currentNode);
			if (foundParent) {
				return foundParent;
			}
		}
	}
	return null;
}

const TreeNode = ({ node, nodeIndex, nodeArr, onEntrePressEv, onCrossClickEv, level = 0 }) => {
	const { label, children } = node;
	const nodeKey = map1.get(level);
	const isNodeLastInGroup = lastInGroup(nodeIndex, nodeArr);

	const LabelLayout = () => (
		<>
			<span>
				{nodeKey}-{label}-{level}
			</span>
			<span
				style={{ cursor: "pointer" }}
				role='img'
				title='remove node ?'
				aria-label='cross'
				onClick={() => onCrossClickEv(node)}>
				❌
			</span>
		</>
	);

	const InputLayout = () => (
		<>
			{isNodeLastInGroup && (
				<>
					<br />
					<input
						type='text'
						autoComplete='false'
						onKeyDown={(e) => e.key === "Enter" && onEntrePressEv(e.target.value, node, nodeKey)}
					/>
				</>
			)}
		</>
	);

	const TreeNodeLayout = () => (
		<>
			<ul>
				{!!children.length &&
					children.map((node, nodeIndex, nodeArr) => (
						<TreeNode
							key={node.label}
							node={node}
							level={level + 1}
							nodeIndex={nodeIndex}
							nodeArr={nodeArr}
							onEntrePressEv={onEntrePressEv}
							onCrossClickEv={onCrossClickEv}
						/>
					))}
			</ul>
		</>
	);

	return (
		<>
			<LabelLayout />
			<InputLayout />
			<br />
			<TreeNodeLayout />
		</>
	);
};

const Tree = () => {
	const [tree, setTree] = useState(treeData.tree);

	const onEntrePressEv = (newNodeLabel, node, nodeKey) => {
		const newNode = new Node(newNodeLabel, generateKey(nodeKey));
		const parentNode = findParentNodeByLabel(tree, node.label);
		if (parentNode) {
			parentNode.children.push(newNode);
			setTree([...tree]);
		}
	};

	const onCrossClickEv = (node) => {
		const parentNode = findParentNodeByLabel(tree, node.label);
		if (parentNode) {
			parentNode.children.pop();
			setTree([...tree]);
		}
	};

	return (
		<div className='tree'>
			{tree.map((node, nodeIndex, nodeArr) => (
				<TreeNode
					key={node.label}
					node={node}
					nodeIndex={nodeIndex}
					nodeArr={nodeArr}
					onEntrePressEv={onEntrePressEv}
					onCrossClickEv={onCrossClickEv}
				/>
			))}
		</div>
	);
};

export default Tree;

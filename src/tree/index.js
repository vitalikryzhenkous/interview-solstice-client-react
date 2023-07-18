import React, { useState } from "react";
import "./index.css";
import treeData from "./data.json";
import Node from "../entities/Node";

// TODO -> Folder -> Constants
export const NODE_KEY_LEVEL_MAP = new Map([
	[0, "1"],
	[1, "1.1"],
	[2, "1.2.1"],
	[3, "1.2.2.1"],
]);
const ArrowDown = () => <>&#8680;</>;
const ArrowRight = () => <>&#8681;</>;
const lastInGroup = (nodeIndex, nodeArr) => {
	const lastNodeInGroup = nodeArr[nodeArr.length - 1];
	return lastNodeInGroup.label === "root" ? false : nodeArr.indexOf(lastNodeInGroup) === nodeIndex;
};

const TreeNode = ({ node, nodeIndex, nodeArr, onEntrePressEv, onCrossClickEv, level = 0 }) => {
	const [collapsed, setCollapsed] = useState(false);
	const { label, children } = node;
	const nodeKey = NODE_KEY_LEVEL_MAP.get(level);
	const isNodeLastInGroup = lastInGroup(nodeIndex, nodeArr);

	// Event
	const toggleCrossClickEv = () => setCollapsed((prev) => !prev);

	// Layout's
	const LabelLayout = () => (
		<>
			{!!children.length && (
				<span
					style={{ cursor: "pointer" }}
					onClick={toggleCrossClickEv}>
					{collapsed ? <ArrowDown /> : <ArrowRight />}
				</span>
			)}
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
			<ul className={!!collapsed ? "invisible" : "node-container visible"}>
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
// TODO -> Folder -> Utils -> Tree
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

const Tree = () => {
	const [tree, setTree] = useState(treeData.tree);

	const onEntrePressEv = (newNodeLabel, node, nodeKey) => {
		const newNode = new Node(newNodeLabel, nodeKey);
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

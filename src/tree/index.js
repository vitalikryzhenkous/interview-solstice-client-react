import React, { useState } from "react";
import "./index.css";
import treeData from "./data.json";

const TreeNode = ({ node }) => {
	const { label, children } = node;
	return (
		<>
			<span>{label}</span>
			<br />
			<ul>
				{!!children.length &&
					children.map((childNode) => (
						<TreeNode
							key={childNode.label}
							node={childNode}
						/>
					))}
			</ul>
		</>
	);
};

const Tree = () => {
	const [tree, setTree] = useState(treeData.tree);
	return (
		<div className='tree'>
			{tree.map((node) => (
				<TreeNode
					key={node.label}
					node={node}
				/>
			))}
		</div>
	);
};

export default Tree;

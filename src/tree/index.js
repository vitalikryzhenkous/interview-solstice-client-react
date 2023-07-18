import React, { useState } from "react";
import "./index.css";
import treeData from "./data.json";

const TreeNode = ({ node, level = 0 }) => {
	const { label, children } = node;
	return (
		<>
			<span>{label} {level}</span>
			<br />
			<ul>
				{!!children.length &&
					children.map((childNode) => (
						<TreeNode
							key={childNode.label}
							node={childNode}
							level={level+1}
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

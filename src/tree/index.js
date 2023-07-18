import React, { useState } from "react";
import "./index.css";
import treeData from "./data.json";

const TreeNode = ({ node }) => {
	const { label, key, children } = node;
	return (
		<>
			<span>{key}</span><span>{label}</span>
			<br />
			<ul>
				{!!children.length &&
					children.map((childNode) => (
						<TreeNode
							key={childNode.key}
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
					key={node.key}
					node={node}
				/>
			))}
		</div>
	);
};

export default Tree;

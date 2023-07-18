import React from "react";
import "./index.css";
const Tree = () => {
	return (
		<div className='tree'>
			root
			<br />
			<ul>
				ant <br />
				bear
				<ul>
					cat <br />
					dog
					<ul>elephant</ul>
				</ul>
				frog
			</ul>
		</div>
	);
};

export default Tree;

import React from 'react';
import RenderTiles from '../RenderTiles';

function NodeTab({ route }) {
	return <RenderTiles name={route.name} />;
}

export default NodeTab;

import React from 'react';
import RenderTiles from '../RenderTiles';

function ReactTab({ route }) {
	return <RenderTiles name={route.name} />;
}

export default ReactTab;

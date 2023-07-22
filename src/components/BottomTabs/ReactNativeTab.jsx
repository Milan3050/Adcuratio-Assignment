import React from 'react';
import RenderTiles from '../RenderTiles';

function ReactNativeTab({ route }) {
	return <RenderTiles name={route.name} />;
}

export default ReactNativeTab;

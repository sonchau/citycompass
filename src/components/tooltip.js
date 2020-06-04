
import React from 'react'
import { Tooltip } from 'antd'

const Tooltips = ({ features }) => {

  const renderFeature = (feature, i) => {
    return (
      <div>
        <Tooltip style={{position: 'absolute', left: feature.mouseX, top: feature.mouseY}} key={i} placement='top'>
        <span>{feature.layer['source-layer']}</span>
        <span>{feature.layer.id}</span>
        </Tooltip>
      </div>
    )
  };

  return features.list.length > 0 ? features.list.map(renderFeature) : null
}

export default Tooltips;
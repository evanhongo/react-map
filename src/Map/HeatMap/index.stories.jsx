import React from 'react';

import  HeatMap from './index.jsx';

const addressPoints = [
  [23.9051801167, 120.4756040167, 115],
  [23.89852955, 120.47974005, 34],
  [23.9075004, 120.47452445, 187],
  [23.90501535, 120.4756865333, 111],
  [23.9068534667, 120.4753966333, 180],
  [23.9029671, 120.4766338333, 85],
  [23.9065173667, 120.4755659333, 158],
  [23.9066938833, 120.4754834833, 166],
  [23.9061558333, 120.4757093333, 142],
  [23.90567525, 120.4753235167, 119],
  [23.9124889333, 120.4727737833, 278]
]

export default {
  title: 'Map/HeatMap',
  component: HeatMap,
};

const Template = (args) => <HeatMap {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  width: "1000px",
  height: "700px",
  points: addressPoints
};


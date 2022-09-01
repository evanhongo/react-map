import React from 'react';

import  MarkerMap from './index.jsx';

export default {
  title: 'Map/MarkerMap',
  component: MarkerMap,
};

const Template = (args) => <MarkerMap {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  width: "1000px",
  height: "700px",
  markers: [{lat: 25.03746, lng: 121.5645, count:5000}, {lat: 22, lng: 120, count:100}, {lat: 22, lng: 121.5, count:20000}]
};


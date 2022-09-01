import React from 'react';

import  DrawMap from './index.jsx';

export default {
  title: 'Map/DrawMap',
  component: DrawMap,
};

const Template = (args) => <DrawMap {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  width: "1000px",
  height: "700px", 
};


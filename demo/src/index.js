import React, { Component } from "react";
import { render } from "react-dom";
import { DrawMap, MarkerClusterGroupMap,HeatMap } from "../../src";

export default class Demo extends Component {
  render() {
    return (
      <div>
        {/* <DrawMap width="1000px" height="700px" /> */}
        <HeatMap width="1000px" height="700px" />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));

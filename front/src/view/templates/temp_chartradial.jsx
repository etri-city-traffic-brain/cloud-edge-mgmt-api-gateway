import React from 'react';
import {
    // main component
    Chart, 
    // graphs
    Bars, Cloud, Dots, Labels, Lines, Pies, RadialLines, Ticks, Title,
    // wrappers
    Layer, Animate, Transform, Handlers,
    // helpers
    helpers, DropShadow, Gradient
  } from 'rumble-charts';

  const series = [{
    data: [1, 3, 2, 5, 7]
  }, {
    data: [5, 11, 7, 13, 19]
  }, {
    data: [13, 19, 17, 23, 29]
  }];

class Demo extends React.Component
{
  render() {
    return (
      <Chart width={600} height={250} series={series}>
      <Transform method={['transpose', 'stackNormalized']}>
        <Pies
          colors='category10'
          combined={true}
          innerRadius='33%'
          padAngle={0.025}
          cornerRadius={5}
          innerPadding={2}
          pieAttributes={{
            onMouseMove: (e) => e.target.style.opacity = 1,
            onMouseLeave: (e) => e.target.style.opacity = 0.5
          }}
          pieStyle={{opacity: 0.5}}
        />
      </Transform>
    </Chart>
    );
  }
}
export default Demo;
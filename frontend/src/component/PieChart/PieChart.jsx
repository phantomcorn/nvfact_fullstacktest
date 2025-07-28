import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

/**
 * PieChart component
 * @param {{ label: string, value: number }[]} data - Array of data objects
 * @param {number} width - SVG width
 * @param {number} height - SVG height
 * @param {string[]} colors - String array of color code. Each color matches the corresponding index of data
 */
export default function PieChart({ data, width = 400, height = 400, colors=d3.schemeCategory10 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const radius = Math.min(width, height) / 2;
    const chartGroup = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(colors);

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Draw slices
    const slices = chartGroup.selectAll('path')
      .data(pie(data))
      .enter()
      .append('g');

    slices.append('path')
      .attr('d', arcGenerator)
      .attr('fill', d => color(d.data.label))
      .append('title').text(d => `${d.data.label} users: ${d.value}`)

    // Add labels
    slices.append('text')
      .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '2rem')
      .style('fill', '#000000')
      .text(d =>  d.value);

      // Create legend
    const legendGroup = svg.append('g')
      .attr('transform', `translate(${width - 100}, 10)`);

    const legendItems = legendGroup.selectAll('g.legend-item')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (_, i) => `translate(40, ${i * 20})`);

    // Color boxes
    legendItems.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', d => color(d.label));

    // Legend text
    legendItems.append('text')
      .attr('x', 16)
      .attr('y', 10)
      .style('font-size', '12px')
      .text(d => d.label);

    // Cleanup on unmount or data change
    return () => {
      svg.selectAll('*').remove();
    };

  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
}

// Usage example:
// import PieChart from './PieChart';
// const data = [
//   { label: 'Apples', value: 30 },
//   { label: 'Bananas', value: 20 },
//   { label: 'Cherries', value: 15 },
//   { label: 'Dates', value: 10 },
//   { label: 'Elderberry', value: 25 }
// ];
// <PieChart data={data} width={400} height={400} />;

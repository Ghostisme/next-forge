'use client';

import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { useChart } from '../hooks/use-chart';

export interface LineChartData {
  x: number | Date;
  y: number;
}

export interface LineChartProps {
  data: LineChartData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export function LineChart({ 
  data, 
  width = 600, 
  height = 400,
  margin = { top: 20, right: 30, bottom: 40, left: 50 }
}: LineChartProps) {
  const chartRef = useChart();

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X 轴比例
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, d => +d.x) as [number, number])
      .range([0, innerWidth]);

    // Y 轴比例
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.y) || 0])
      .nice()
      .range([innerHeight, 0]);

    // 创建线生成器
    const line = d3
      .line<LineChartData>()
      .x(d => x(+d.x))
      .y(d => y(d.y))
      .curve(d3.curveMonotoneX);

    // 绘制折线
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // 添加数据点
    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(+d.x))
      .attr('cy', d => y(d.y))
      .attr('r', 4)
      .attr('fill', 'steelblue');

    // 添加 X 轴
    svg
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // 添加 Y 轴
    svg.append('g').call(d3.axisLeft(y));

  }, [data, width, height, margin]);

  return <div ref={chartRef} />;
}
'use client';

import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { useChart } from '../hooks/use-chart';

export interface BarChartData {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export function BarChart({ 
  data, 
  width = 600, 
  height = 400,
  margin = { top: 20, right: 30, bottom: 40, left: 50 }
}: BarChartProps) {
  const chartRef = useChart();

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    // 清除之前的图表
    d3.select(chartRef.current).selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 创建 SVG
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X 轴比例
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.2);

    // Y 轴比例
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    // 绘制柱状图
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label) || 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.value))
      .attr('fill', 'steelblue')
      .attr('rx', 4);

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
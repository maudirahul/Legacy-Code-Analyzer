import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const DependencyGraph = ({ data, onNodeClick }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const [viewFilter, setViewFilter] = useState("all");

  useEffect(() => {
    if (!data || !data.node || !data.edges) return;

    // --- 1. ENHANCED NODE LOGIC ---
    let nodes = data.node.map((filePath) => {
      const name = filePath.split("/").pop();
      const isBackend = filePath.startsWith("backend");
      const isConfig = name.includes("config") || name.includes(".json") || name.includes(".env");
      
      // Assign specific colors and sizes
      let color = "#3b82f6"; // Default Blue (Frontend)
      let type = "Frontend";
      if (isBackend) { color = "#a855f7"; type = "Backend"; }
      if (isConfig) { color = "#10b981"; type = "Config"; }

      return {
        id: filePath,
        name: name,
        type: type,
        color: color,
        radius: 14, // Base radius, we will adjust this later based on connections
      };
    });

    if (viewFilter !== "all") {
      nodes = nodes.filter((n) => n.type.toLowerCase() === viewFilter);
    }

    const validNodeIds = new Set(nodes.map((n) => n.id));
    const links = data.edges
      .map((edge) => ({ ...edge, source: edge.from, target: edge.to }))
      .filter((link) => validNodeIds.has(link.source) && validNodeIds.has(link.target));

    // Calculate node weight (how many connections it has) to scale its size
    links.forEach(link => {
      const targetNode = nodes.find(n => n.id === link.target);
      if(targetNode) targetNode.radius = Math.min(24, targetNode.radius + 1.5); // Cap at 24px
    });

    // Create Adjacency Dictionary
    const linkedByIndex = {};
    links.forEach((d) => {
      linkedByIndex[`${d.source},${d.target}`] = true;
    });

    const isConnected = (a, b) => {
      return linkedByIndex[`${a.id},${b.id}`] || linkedByIndex[`${b.id},${a.id}`] || a.id === b.id;
    };

    const width = wrapperRef.current?.clientWidth || 800;
    const height = wrapperRef.current?.clientHeight || 600;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // --- 2. PREMIUM DEFINITIONS (Glows & Arrows) ---
    const defs = svg.append("defs");
    
    // Sleek Arrowhead
    defs.append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 0) // We handle offset in the line calculation now
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "rgba(255, 255, 255, 0.4)");

    // Soft Glow Filter
    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "2.5").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const zoom = d3.zoom().scaleExtent([0.1, 4]).on("zoom", (event) => {
      g.attr("transform", event.transform);
    });
    svg.call(zoom);

    const g = svg.append("g");

    // --- 3. PHYSICS ENGINE ---
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(120)) // Tighter links
      .force("charge", d3.forceManyBody().strength(-400)) // Repel each other
      .force("collide", d3.forceCollide().radius(d => d.radius + 20)) // Prevent overlaps
      .force("center", d3.forceCenter(width / 2, height / 2));

    // --- 4. DRAW LINKS WITH TRANSITIONS ---
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "rgba(255, 255, 255, 0.15)")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)")
      .style("transition", "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease");

    // --- 5. DRAW PREMIUM NODES ---
    const node = g.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => d.color)
      .attr("stroke", "rgba(255,255,255,0.8)")
      .attr("stroke-width", 1.5)
      .attr("cursor", "pointer")
      .style("filter", "url(#glow)") // Apply the glow!
      .style("transition", "opacity 0.3s ease, r 0.2s ease")
      .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

    // --- 6. DRAW LABELS ---
    const label = g.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.name)
      .attr("font-size", 11)
      .attr("font-family", "ui-sans-serif, system-ui, sans-serif")
      .attr("font-weight", "600")
      .attr("fill", "#94a3b8")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.radius + 16)
      .style("pointer-events", "none")
      .style("transition", "opacity 0.3s ease, fill 0.3s ease");

    // --- 7. SMOOTH HOVER LOGIC ---
    node
      .on("mouseover", function (event, d) {
        // Fade non-connected elements
        node.style("opacity", (o) => (isConnected(d, o) ? 1 : 0.05));
        label
          .style("opacity", (o) => (isConnected(d, o) ? 1 : 0.05))
          .attr("fill", (o) => (o.id === d.id ? "#ffffff" : "#94a3b8"));
        
        // Highlight active links
        link
          .style("opacity", (o) => (o.source.id === d.id || o.target.id === d.id ? 1 : 0.05))
          .attr("stroke", (o) => (o.source.id === d.id || o.target.id === d.id ? d.color : "rgba(255, 255, 255, 0.15)"))
          .attr("stroke-width", (o) => (o.source.id === d.id || o.target.id === d.id ? 2.5 : 1.5));

        d3.select(this).attr("stroke", "#ffffff").attr("stroke-width", 3).attr("r", d.radius + 3);
      })
      .on("mouseout", function (event, d) {
        node.style("opacity", 1).attr("stroke", "rgba(255,255,255,0.8)").attr("stroke-width", 1.5).attr("r", d.radius);
        link.style("opacity", 1).attr("stroke", "rgba(255, 255, 255, 0.15)").attr("stroke-width", 1.5);
        label.style("opacity", 1).attr("fill", "#94a3b8");
      })
      .on("click", function (event, d) {
        event.stopPropagation();
        if (onNodeClick) onNodeClick({ id: d.id, name: d.name, isBackend: d.type === "Backend" });
      });

    // --- 8. TICK UPDATE (With Math for Arrowheads) ---
    simulation.on("tick", () => {
      link.each(function (d) {
        // Math to stop the line exactly at the edge of the target circle!
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const radiusOffset = d.target.radius + 8; // Offset for arrow size
        
        const targetX = d.target.x - (dx * radiusOffset) / distance;
        const targetY = d.target.y - (dy * radiusOffset) / distance;

        d3.select(this)
          .attr("x1", d.source.x)
          .attr("y1", d.source.y)
          .attr("x2", targetX)
          .attr("y2", targetY);
      });

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [data, viewFilter]); 

  return (
    <div ref={wrapperRef} className="w-full h-full min-h-125 bg-[#0a0a0c] flex items-center justify-center relative overflow-hidden">
      
      {/* FILTER BUTTONS */}
      <div className="absolute top-6 right-6 z-10 flex bg-black/40 backdrop-blur-md p-1 rounded-lg border border-white/10 shadow-xl">
        {["all", "frontend", "backend",].map((filter) => (
          <button
            key={filter}
            onClick={() => setViewFilter(filter)}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all duration-200 ${
              viewFilter === filter
                ? "bg-white/10 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* LEGEND */}
      <div className="absolute top-6 left-6 z-10 flex flex-col bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10 shadow-xl pointer-events-none">
       
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
          <span className="text-xs text-slate-300 font-medium tracking-wide">Frontend</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></div>
          <span className="text-xs text-slate-300 font-medium tracking-wide">Backend</span>
        </div>
      </div>

      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing"></svg>
    </div>
  );
};

export default DependencyGraph;
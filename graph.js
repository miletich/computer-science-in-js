"use strict";
import dictionary from "./dictionary";
import queue from "./queue";
import stack from "./stack";

function graph() {
  const vertices = [];
  const adjList = dictionary();

  function addVertex(v) {
    vertices.push(v);
    adjList.set(v, []);
  }

  function addEdge(v, w) {
    adjList.get(v).push(w); // Would be enough for a directed graph
    adjList.get(w).push(v); // Needed for an undirected graph
  }

  function toString() {
    let s = "";

    for (let i = 0; i < vertices.length; i++) {
      s += vertices[i] + " -> ";
      const neighbours = adjList.get(vertices[i]);

      for (let i = 0; i < neighbours.length; i++) {
        s += neighbours[i] + " ";
      }

      s += "\n";
    }

    return s;
  }

  function bfs(callback, v = vertices[0]) {
    const q = queue();
    const status = initialiseStatus();
    q.enqueue(v);

    while (!q.isEmpty()) {
      const u = q.dequeue(u);
      status[u] = "discovered";
      const neighbours = adjList.get(u);

      for (let i = 0; i < neighbours.length; i++) {
        const w = neighbours[i];
        if (status[w] === "unvisited") {
          status[w] = "explored";
          q.enqueue(w);
        }
      }

      status[u] = "explored";
      if (callback) {
        callback(u);
      }
    }

    function initialiseStatus() {
      const status = {};

      for (let i = 0; i < vertices.length; i++) {
        status[vertices[i]] = "unvisited";
      }

      return status;
    }
  }

  function shortestPath(v = vertices[0]) {
    // Calculate distances and predecessors from 'v' to every other vertext
    const status = initialise().status;
    const predecessors = initialise().predecessors;
    const distance = initialise().distance;
    const q = queue();

    q.enqueue(v);

    while (!q.isEmpty()) {
      const u = q.dequeue();
      const neighbours = adjList.get(u);
      status[u] = "discovered";

      for (let i = 0; i < neighbours.length; i++) {
        const w = neighbours[i];

        if (status[w] === "unvisited") {
          status[w] = "discovered";
          predecessors[w] = u;
          distance[w] = distance[u] + 1;
          q.enqueue(w);
        }
      }

      status[u] = "explored";
    }

    // Display paths from vertex 'v' to every other vertex in the graph
    const fromVertex = v;
    let s = "";

    for (let i = 0; i < vertices.length; i++) {
      const toVertex = vertices[i];
      const path = stack();

      for (let v = toVertex; v !== fromVertex; v = predecessors[v]) {
        path.push(v);
      }
      s += fromVertex;
      while (!path.isEmpty()) {
        s += " - " + path.pop();
      }
      s += "\n";
    }
    return s;

    // Helper function
    function initialise() {
      const status = {};
      const predecessors = {};
      const distance = {};

      for (let i = 0; i < vertices.length; i++) {
        status[vertices[i]] = "unvisited";
        predecessors[vertices[i]] = null;
        distance[vertices[i]] = 0;
      }

      return { status, predecessors, distance};
    }
  }

  return { addVertex, addEdge, toString, bfs, shortestPath };
}

export default graph;

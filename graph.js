"use strict";
import dictionary from "./dictionary";
import queue from "./queue";

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

  return { addVertex, addEdge, toString, bfs };
}

export default graph;

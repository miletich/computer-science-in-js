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
    adjList.get(v).push(w);
  }

  function toString() {
    let s = "";

    for (let i = 0; i < vertices.length; i++) {
      const neighbours = adjList.get(vertices[i]);
      s += vertices[i] + " -> ";

      for (let i = 0; i < neighbours.length; i++) {
        s += [neighbours[i]] + " ";
      }

      s += "\n";
    }

    return s;
  }

  function bfs(callback, v = vertices[0]){
    const status = initialiseStatus();
    const q = queue();
    q.enqueue(v);

    while (!q.isEmpty()) {
      const u = q.dequeue();
      status[u] = "discovered";
      const neighbours = adjList.get(u);

      for (let i = 0; i < neighbours.length; i++) {
        const w = neighbours[i];

        if (status[w] === "unvisited") {
          status[w] = "discovered";
          q.enqueue(w);
        }
      }

      if (callback) {
        callback(u);
      }

      status[u] = "explored";
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
    const path = stack();

    for (let i = 0; i < vertices.length; i++) {
      if (status[vertices[i]] === "explored") {
        const toVertex = vertices[i];

        for (let v = toVertex; v !== fromVertex; v = predecessors[v]) {
          path.push(v);
        }
        s += fromVertex;
        while (!path.isEmpty()) {
          s += " - " + path.pop();
        }
        s += "\n";
      }

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

  function dfs(callback) {
    const status = initialiseStatus();

    for (let i = 0; i < vertices.length; i++) {
      if (status[vertices[i]] === "unvisited") {
        dfsVisit(vertices[i], status, callback);
      }
    }

    // Does the actual visiting
    function dfsVisit(u, status, callback) {
      status[u] = "discovered";
      if (callback) {
        callback(u);
      }

      const neighbours = adjList.get(u);
      for (let i = 0; i < neighbours.length; i++) {
        const w = neighbours[i];
        if (status[w] === "unvisited") {
          dfsVisit(w, status, callback);
        }
      }

      status[u] = "explored";
    }

    // Helper function
    function initialiseStatus() {
      const status = {};

      for (let i = 0; i < vertices.length; i++) {
        status[vertices[i]] = "unvisited";
      }

      return status;
    }
  }

  function toposort() {
    const result = dfsExplore().finishTime;
    const order = [];
    for (let v in result) {
      order.push({
        key: v,
        result: result[v]
      });
    }
    order.sort((a, b) => b.result - a.result);

    let s = "";
    for (let i = 0; i < order.length; i++) {
      s += order[i].key;
      if (i < order.length - 1) {
        s += " - ";
      }
    }

    return s;

    // Calculates discovery and finish times of vertices and tracks their predecessors
    function dfsExplore() {
      const status = initialise().status;
      const predecessors = initialise().predecessors;
      const discoveryTime = initialise().discoveryTime;
      const finishTime = initialise().finishTime;
      let time = 0;

      for (let i = 0; i < vertices.length; i++) {
        if (status[vertices[i]] === "unvisited") {
          dfsVisit(vertices[i], status, discoveryTime, finishTime, predecessors);
        }
      }

      return { discoveryTime, finishTime, predecessors };

      // Visits vertices
      function dfsVisit(u, status, discoveryTime, finishTime, predecessors) {
        status[u] = "discovered";
        discoveryTime[u] = ++time;
        const neighbours = adjList.get(u);

        for (let i = 0; i < neighbours.length; i++) {
          const w = neighbours[i];

          if (status[w] === "unvisited") {
            predecessors[w] = u;
            dfsVisit(w, status, discoveryTime, finishTime, predecessors);
          }
        }

        finishTime[u] = ++time;
        status[u] = "explored";
      }

      // Helper function
      function initialise() {
        const status = {};
        const predecessors = {};
        const discoveryTime = {};
        const finishTime = {};

        for (let i = 0; i < vertices.length; i++) {
          const v = vertices[i];
          status[v] = "unvisited";
          predecessors[v] = null;
          discoveryTime[v] = 0;
          finishTime[v] = 0;
        }

        return { status, predecessors, discoveryTime, finishTime };
      }
    }

  }

  return { addVertex, addEdge, toString, bfs, shortestPath, dfs, toposort };
}

export default graph;

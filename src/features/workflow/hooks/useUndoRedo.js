import { useState, useCallback } from 'react';

export const useUndoRedo = (initialNodes, initialEdges, setNodes, setEdges) => {
  const [history, setHistory] = useState([{ nodes: initialNodes, edges: initialEdges }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const takeSnapshot = useCallback((nodes, edges) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push({ nodes, edges });
      return newHistory;
    });
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      const prevState = history[currentIndex - 1];
      if (prevState && prevState.nodes && prevState.edges) {
        setNodes(prevState.nodes);
        setEdges(prevState.edges);
      }
    }
  }, [currentIndex, history, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      const nextState = history[currentIndex + 1];
      if (nextState && nextState.nodes && nextState.edges) {
        setNodes(nextState.nodes);
        setEdges(nextState.edges);
      }
    }
  }, [currentIndex, history, setNodes, setEdges]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return { undo, redo, canUndo, canRedo, takeSnapshot };
};
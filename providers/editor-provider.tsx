"use client";
import { EditorNodeType } from "@/lib/types";
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

export type EditorNode = EditorNodeType

export type Editor = {
    elements: EditorNode[]
    edges: {
        id: string
        source: string
        target: string
    }[]

    selectedNode: EditorNodeType
}

export type HistoryState = {
    editor: Editor
    history: HistoryState
}

type Props = {};

const EditorProvider = (props: Props) => {
  return <div></div>;
};

export default EditorProvider;

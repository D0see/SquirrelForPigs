import React from 'react'
import { useState, useEffect } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react';
import { customMonacoEditorOptions, minitelTheme } from './monacoEditorParameters.js';
import EditorLoader from '../EditorLoader/EditorLoader.jsx';
import './QueryEntry.css'

export default function QueryEntry({handleQueryChange, query}) {
  const monaco = useMonaco();
  
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('my-dark-theme', minitelTheme);

      monaco.editor.setTheme('my-dark-theme');
    }
  }, [monaco]);
  
  const handleEditorDidMount = (editor, monacoInstance) => {
    editor.updateOptions(customMonacoEditorOptions)
  }

  return (
    <>
      <Editor
                className= 'query-editor'
                height="30vh"
                defaultLanguage="sql"
                value={query}
                onChange={handleQueryChange}
                onMount={handleEditorDidMount}
                loading={<EditorLoader/>}
        />
    </>
  )
}

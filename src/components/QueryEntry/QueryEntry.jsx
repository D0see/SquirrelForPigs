import React from 'react'
import { useState, useEffect } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react';
import { customMonacoEditorOptions } from './monacoEditorParameters.js';
import EditorLoader from '../EditorLoader/EditorLoader.jsx';
import './QueryEntry.css'

export default function QueryEntry({handleQueryChange, query}) {
  const monaco = useMonaco();
  
  useEffect(() => {
    if (monaco) {
      const rootStyles = getComputedStyle(document.documentElement);
      monaco.editor.defineTheme('my-dark-theme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword.sql', foreground: rootStyles.getPropertyValue('--error') },
          { token: 'string.sql', foreground: rootStyles.getPropertyValue('--success') },
          { token: 'number.sql', foreground: rootStyles.getPropertyValue('--color-primary')},
          { token: 'operator.sql', foreground: rootStyles.getPropertyValue('--warning')},
        ],
        colors: {
          'editor.lineHighlightBackground': '#00000000',
          'editor.lineHighlightBorder': '#00000000',
          'editor.background': rootStyles.getPropertyValue('--color-dark'),
          'editor.foreground': rootStyles.getPropertyValue('--color-primary'),
        },
      });

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

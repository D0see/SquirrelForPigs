export const customMonacoEditorOptions = {
    glyphMargin: false,
    fontSize: 16,
    fontFamily: "'Minitel'",
    scrollBeyondLastLine: false,
    scrollbar: {
    vertical: 'hidden',
    horizontal: 'hidden',
    handleMouseWheel: false,
    alwaysConsumeMouseWheel: false,
    },
    lineNumbers: 'off',
    minimap: { enabled: false },
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    wordWrap: 'on',
}

const rootStyles = getComputedStyle(document.documentElement);

export const minitelTheme = {
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
      }

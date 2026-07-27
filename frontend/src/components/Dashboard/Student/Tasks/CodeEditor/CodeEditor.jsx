import Editor from "@monaco-editor/react";
import { useState } from "react";
import "./CodeEditor.css";

export default function CodeEditor({

    language = "javascript",

    theme = "vs-dark",

    height = "500px",

    value = "",

    onChange,

}) {

    const [fontSize, setFontSize] = useState(15);

    return (

        <div className="editor-container">

            <div className="editor-toolbar">

                <div className="toolbar-left">

                    <h3>VS Code Editor</h3>

                    <span>{language}</span>

                </div>

                <div className="toolbar-right">

                    <button onClick={() => setFontSize(fontSize - 1)}>

                        A-

                    </button>

                    <button onClick={() => setFontSize(fontSize + 1)}>

                        A+

                    </button>

                </div>

            </div>

            <Editor

                height={height}

                theme={theme}

                language={language}

                value={value}

                onChange={onChange}

                options={{

                    fontSize,

                    minimap: {

                        enabled: false,

                    },

                    automaticLayout: true,

                    scrollBeyondLastLine: false,

                    wordWrap: "on",

                    cursorBlinking: "smooth",

                    cursorSmoothCaretAnimation: "on",

                    smoothScrolling: true,

                    formatOnPaste: true,

                    formatOnType: true,

                    padding: {

                        top: 15,

                    },

                }}

            />

        </div>

    );

}
export const getWebContainerPrompt = () => {
    return `You are Codefather, an expert AI assistant and exceptional senior software developer with vast knowledge across multiple programming languages, frameworks, and best practices.
  
    <system_constraints>
    You are operating in an environment called WebContainer, an in-browser Node.js runtime that emulates a Linux system to some degree. However, it runs entirely in the browser and does not use a cloud VM for execution. The WebContainer provides a shell that emulates zsh but cannot execute native binaries.
  
    **Key Limitations:**
    - **No Native Binaries:** WebContainer cannot run or compile C/C++ or any other native binary executables.
    - **Limited Python Support:** The shell includes \`python\` and \`python3\`, but they are limited to the Python **standard library only**.
      - 🚫 No \`pip\` support – third-party Python libraries cannot be installed.
      - 🚫 Some standard library modules requiring system dependencies (e.g., \`curses\`) are unavailable.
    - **No Git Support:** WebContainer does not include Git.
    - **No Shell Scripting:** Shell scripts are not fully supported; use Node.js for scripting tasks.
    - **Database Support:** Prefer databases that do not rely on native binaries, such as:
      - ✅ SQLite (browser-compatible versions)
      - ✅ libSQL (if compatible)
      - 🚫 Avoid databases requiring native drivers like MySQL/PostgreSQL.
  
    **Web Server Support:**
    - WebContainer can run a web server but requires an npm package like:
      - ✅ Vite (preferred)
      - ✅ http-server
      - ✅ servor
    - Custom web servers using Node.js APIs are possible but **not recommended** over Vite.
  
    **Allowed HTML Elements:**
    - Standard semantic elements: \`<html>, <head>, <body>, <header>, <footer>, <main>, <section>, <article>, <aside>, <nav>, <div>, <span>, <p>, <h1> - <h6>, <ul>, <ol>, <li>, <table>, <tr>, <td>, <th>, <form>, <input>, <button>, <textarea>, <select>, <option>, <label>, <img>, <a>, <iframe>, <video>, <audio>, <script>, <link>, <meta>, <style>\`.
    - No inline event handlers (use JavaScript listeners instead).
    - No deprecated elements like \`<marquee>\` or \`<blink>\`.
  
    **Available Shell Commands:**
    \`cat, chmod, cp, echo, hostname, kill, ln, ls, mkdir, mv, ps, pwd, rm, rmdir, xxd, alias, cd, clear, curl, env, false, getconf, head, sort, tail, touch, true, uptime, which, code, jq, loadenv, node, python3, wasm, xdg-open, command, exit, export, source\`
    </system_constraints>
  
    <code_formatting_info>
    - Use **2 spaces** for code indentation.
    - Follow best practices for readability and maintainability.
    - Ensure all scripts are compatible with the latest stable versions.
    </code_formatting_info>
  
    <message_formatting_info>
    **All responses MUST follow this strict JSON format:**
    </message_formatting_info>
  
    <json_response_structure>
    Responses must be in **valid JSON format**:
  
    \`\`\`json
    {
      "action": "create | modify | remove | execute",
      "type": "file | command | note",
      "filePath": "path/to/file",
      "content": "full content of the file, shell command, or note message"
    }
    \`\`\`
  
    **Action Types:**
    - \`"create"\` → Creating a new file.
    - \`"modify"\` → Modifying an existing file.
    - \`"remove"\` → Deleting a file (content is omitted).
    - \`"execute"\` → Running shell commands in WebContainer.
    - \`"note"\` → Adding notes at various stages of the process.
  
    **Example steps:**
  
    ✅ **Creating a File:**
    \`\`\`json
    {
      "action": "create",
      "type": "file",
      "filePath": "src/main.jsx",
      "content": "import React from 'react';\\nimport ReactDOM from 'react-dom';\\nReactDOM.render(<App />, document.getElementById('root'));"
    }
    \`\`\`
  
    ✅ **Modifying a File:**
    \`\`\`json
    {
      "action": "modify",
      "type": "file",
      "filePath": "src/main.jsx",
      "content": "import React from 'react';\\nimport ReactDOM from 'react-dom';\\nReactDOM.createRoot(document.getElementById('root')).render(<App />);"
    }
    \`\`\`
  
    ✅ **Removing a File:**
    \`\`\`json
    {
      "action": "remove",
      "type": "file",
      "filePath": "src/oldFile.js"
    }
    \`\`\`
  
    ✅ **Executing Shell Commands:**
    \`\`\`json
    {
      "action": "execute",
      "type": "command",
      "content": "<boltAction type='shell'> npm install && npm run dev </boltAction>"
    }
    \`\`\`
  
    ✅ **Adding Notes:**
    \`\`\`json
    {
      "action": "create",
      "type": "note",
      "content": "I am creating the best website for you."
    }
    \`\`\`
  
    ✅ **Adding Notes After a Step:**
    \`\`\`json
    {
      "action": "note",
      "type": "note",
      "content": "Modified this file. I hope now the issue has been resolved."
    }
    \`\`\`


     **Example Prompt for a Note-Taking App:**
    \`\`\`json
    {
      "boltArtifact": {
        "id": "note-taking-app",
        "title": "Modern Note Taking Application",
        "boltAction": [
          {
            "type": "file",
            "filePath": "package.json",
            "content": "{\"name\": \"notes-app\", \"private\": true, \"version\": \"0.1.0\", \"type\": \"module\", \"scripts\": {\"dev\": \"vite\", \"build\": \"vite build\", \"preview\": \"vite preview\"}, \"dependencies\": {\"lucide-react\": \"^0.294.0\", \"react\": \"^18.2.0\", \"react-dom\": \"^18.2.0\"}, \"devDependencies\": {\"@tailwindcss/typography\": \"^0.5.10\", \"@types/react\": \"^18.2.45\", \"@types/react-dom\": \"^18.2.18\", \"@vitejs/plugin-react\": \"^4.2.0\", \"autoprefixer\": \"^10.4.16\", \"postcss\": \"^8.4.31\", \"tailwindcss\": \"^3.3.3\", \"vite\": \"^5.0.8\"}}"
          },
          {
            "type": "file",
            "filePath": "App.jsx",
            "content": "import { useState, useEffect } from 'react';\nimport { Save, Trash2, Plus, Search } from 'lucide-react';\n\nconst NoteApp = () => {\n  const [notes, setNotes] = useState([]);\n  return <div>Note App</div>;\n}\nexport default NoteApp;"
          }
        ]
      }
    }
    \`\`\`
    </json_response_structure>
  
    <guidelines>
    1. **Always return a JSON object** – avoid plaintext or markdown outside JSON.
    2. **Provide complete solutions** – include full content for modified files.
    3. **Ensure valid JSON formatting** – responses must be valid and properly structured.
    4. **Avoid placeholders** – do not use comments like \`// ...rest of the code\`. Always provide full code.
    5. **Think holistically** – ensure responses consider dependencies and project structure.
    6. **Ensure compatibility** – fallback to stable versions if the latest versions are not compatible.
    7. **Optimize performance** – generate websites with minimal load times, efficient asset management, and SEO best practices.
    8. **Use the \`execute\` action for shell commands** – ensure compatibility with WebContainer.
    </guidelines>
    `;
}


export const basePrompt = `
For all designs I request, ensure they are visually stunning, modern, and unique—avoiding generic or cookie-cutter layouts. 
Every webpage should be fully featured, responsive, and production-ready.

### Development Guidelines:
- The template must support **JSX syntax** with **Tailwind CSS** classes by default.
- Use **React hooks** for state management and interactivity.
- For icons, exclusively use **Lucide React**—do not install additional UI libraries, icon packs, or themes unless explicitly requested.
- Use **icons from Lucide React** for logos where applicable.

### Image Handling:
- When stock photos are needed, **only use valid URLs from Unsplash**.
- Do not download or embed images directly—link them dynamically via \`<img>\` tags.

Keep all designs **clean, intuitive, and high-quality**, ensuring they meet professional web standards.
`;


export const templates =  [
        {
            "id": "vite-react",
            "files": {
                "README.md": "# React + Vite\n\nThis template provides a minimal setup to get React (JavaScript) working in Vite with HMR and ESLint rules.\n\nCurrently, two official plugins are available:\n\n- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh\n- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh\n",
                ".gitignore": "# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n",
                "eslint.config.js": "import js from '@eslint/js'\nimport globals from 'globals'\nimport react from 'eslint-plugin-react'\nimport reactHooks from 'eslint-plugin-react-hooks'\nimport reactRefresh from 'eslint-plugin-react-refresh'\n\nexport default [\n  { ignores: ['dist'] },\n  {\n    files: ['**/*.{js,jsx}'],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n      parserOptions: {\n        ecmaVersion: 'latest',\n        ecmaFeatures: { jsx: true },\n        sourceType: 'module'\n      }\n    },\n    settings: { react: { version: '18.3' } },\n    plugins: {\n      react,\n      'react-hooks': reactHooks,\n      'react-refresh': reactRefresh\n    },\n    rules: {\n      ...js.configs.recommended.rules,\n      ...react.configs.recommended.rules,\n      ...react.configs['jsx-runtime'].rules,\n      ...reactHooks.configs.recommended.rules,\n      'react/jsx-no-target-blank': 'off',\n      'react-refresh/only-export-components': [\n        'warn',\n        { allowConstantExport: true }\n      ]\n    }\n  }\n]\n",
                "index.html": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite + React</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n",
                "vite.config.js": "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()]\n})\n",
                "package.json": "{\n  \"name\": \"vite-react-starter\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"lint\": \"eslint .\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.3.1\",\n    \"react-dom\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"@eslint/js\": \"^9.9.1\",\n    \"@types/react\": \"^18.3.5\",\n    \"@types/react-dom\": \"^18.3.0\",\n    \"@vitejs/plugin-react\": \"^4.3.1\",\n    \"eslint\": \"^9.9.1\",\n    \"eslint-plugin-react\": \"^7.35.0\",\n    \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.11\",\n    \"globals\": \"^15.9.0\",\n    \"vite\": \"^5.4.2\"\n  }\n}\n",
                "public/vite.svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--logos\" width=\"31.88\" height=\"32\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 256 257\"><defs><linearGradient id=\"IconifyId1813088fe1fbc01fb466\" x1=\"-.828%\" x2=\"57.636%\" y1=\"7.652%\" y2=\"78.411%\"><stop offset=\"0%\" stop-color=\"#41D1FF\"></stop><stop offset=\"100%\" stop-color=\"#BD34FE\"></stop></linearGradient><linearGradient id=\"IconifyId1813088fe1fbc01fb467\" x1=\"43.376%\" x2=\"50.316%\" y1=\"2.242%\" y2=\"89.03%\"><stop offset=\"0%\" stop-color=\"#FFEA83\"></stop><stop offset=\"8.333%\" stop-color=\"#FFDD35\"></stop><stop offset=\"100%\" stop-color=\"#FFA800\"></stop></linearGradient></defs><path fill=\"url(#IconifyId1813088fe1fbc01fb466)\" d=\"M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z\"></path><path fill=\"url(#IconifyId1813088fe1fbc01fb467)\" d=\"M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z\"></path></svg>",
                "src/App.css": "#root {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n  transition: filter 300ms;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.react:hover {\n  filter: drop-shadow(0 0 2em #61dafbaa);\n}\n\n@keyframes logo-spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  a:nth-of-type(2) .logo { animation: logo-spin infinite 20s linear; }\n}\n\n.card { padding: 2em; }\n\n.read-the-docs { color: #888; }\n",
                "src/App.jsx": "import { useState } from 'react';\nimport reactLogo from './assets/react.svg';\nimport viteLogo from '/vite.svg';\nimport './App.css';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <>\n      <div>\n        <a href=\"https://vitejs.dev\" target=\"_blank\">\n          <img src={viteLogo} className=\"logo\" alt=\"Vite logo\" />\n        </a>\n        <a href=\"https://react.dev\" target=\"_blank\">\n          <img src={reactLogo} className=\"logo react\" alt=\"React logo\" />\n        </a>\n      </div>\n      <h1>Vite + React</h1>\n      <div className=\"card\">\n        <button onClick={() => setCount(count => count + 1)}>\n          count is {count}\n        </button>\n        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>\n      </div>\n      <p className=\"read-the-docs\">Click on the Vite and React logos to learn more</p>\n    </>\n  );\n}\n\nexport default App;\n",
                "src/index.css": ":root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\na { font-weight: 500; color: #646cff; text-decoration: inherit; }\na:hover { color: #535bf2; }\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\nh1 { font-size: 3.2em; line-height: 1.1; }\n\nbutton {\n  border-radius: 8px;\n  border: 1px solid transparent;\n  padding: 0.6em 1.2em;\n  font-size: 1em;\n  font-weight: 500;\n  font-family: inherit;\n  background-color: #1a1a1a;\n  cursor: pointer;\n  transition: border-color 0.25s;\n}\nbutton:hover { border-color: #646cff; }\nbutton:focus, button:focus-visible { outline: 4px auto -webkit-focus-ring-color; }\n\n@media (prefers-color-scheme: light) {\n  :root { color: #213547; background-color: #ffffff; }\n  a:hover { color: #747bff; }\n  button { background-color: #f9f9f9; }\n}\n",
                "src/main.jsx": "import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.jsx';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);\n",
                "src/assets/react.svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--logos\" width=\"35.93\" height=\"32\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 256 228\"><path fill=\"#00D8FF\" d=\"M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z\"></path></svg>"
            }
        },
        {
            "id": "vite-react-ts",
            "files": {
                "README.md": "# React + Vite + TypeScript\n\nThis template sets up a React project using Vite with TypeScript, HMR, and ESLint.\n",
                ".gitignore": "# Logs\nlogs\n*.log\nnode_modules\n/dist\n",
                "tsconfig.json": "{\n  \"compilerOptions\": {\n    \"target\": \"ESNext\",\n    \"useDefineForClassFields\": true,\n    \"lib\": [\"DOM\", \"DOM.Iterable\", \"ESNext\"],\n    \"allowJs\": false,\n    \"skipLibCheck\": true,\n    \"esModuleInterop\": false,\n    \"allowSyntheticDefaultImports\": true,\n    \"strict\": true,\n    \"forceConsistentCasingInFileNames\": true,\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"Node\",\n    \"resolveJsonModule\": true,\n    \"isolatedModules\": true,\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\"\n  },\n  \"include\": [\"src\"]\n}\n",
                "vite.config.ts": "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()]\n});\n",
                "package.json": "{\n  \"name\": \"vite-react-ts-starter\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"lint\": \"eslint .\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.3.1\",\n    \"react-dom\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"@types/react\": \"^18.3.5\",\n    \"@types/react-dom\": \"^18.3.0\",\n    \"@vitejs/plugin-react\": \"^4.3.1\",\n    \"typescript\": \"^4.8.4\",\n    \"vite\": \"^5.4.2\",\n    \"eslint\": \"^9.9.1\",\n    \"@eslint/js\": \"^9.9.1\",\n    \"eslint-plugin-react\": \"^7.35.0\",\n    \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.11\",\n    \"globals\": \"^15.9.0\"\n  }\n}\n",
                "src/main.tsx": "import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);\n",
                "src/App.tsx": "import { useState } from 'react';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <>\n      <h1>Vite + React + TypeScript</h1>\n      <button onClick={() => setCount(c => c + 1)}>Count is {count}</button>\n    </>\n  );\n}\n\nexport default App;\n",
                "src/index.css": "/* Your CSS here */\n"
            }
        },
        {
            "id": "angular-cli",
            "files": {
                "README.md": "# Angular Starter\n\nThis template provides a minimal setup for an Angular application using Angular CLI.\n",
                ".gitignore": "node_modules\n/dist\n",
                "angular.json": "{\n  \"version\": 1,\n  \"projects\": {\n    \"angular-starter\": {\n      \"projectType\": \"application\",\n      \"root\": \"\",\n      \"sourceRoot\": \"src\",\n      \"architect\": {}\n    }\n  }\n}\n",
                "package.json": "{\n  \"name\": \"angular-starter\",\n  \"version\": \"0.0.0\",\n  \"scripts\": {\n    \"ng\": \"ng\",\n    \"start\": \"ng serve\",\n    \"build\": \"ng build\"\n  },\n  \"dependencies\": {\n    \"@angular/animations\": \"^15.0.0\",\n    \"@angular/common\": \"^15.0.0\",\n    \"@angular/compiler\": \"^15.0.0\",\n    \"@angular/core\": \"^15.0.0\",\n    \"@angular/forms\": \"^15.0.0\",\n    \"@angular/platform-browser\": \"^15.0.0\",\n    \"@angular/platform-browser-dynamic\": \"^15.0.0\",\n    \"rxjs\": \"~7.8.0\",\n    \"zone.js\": \"~0.12.0\"\n  },\n  \"devDependencies\": {\n    \"@angular/cli\": \"^15.0.0\",\n    \"@angular/compiler-cli\": \"^15.0.0\",\n    \"typescript\": \"~4.8.2\"\n  }\n}\n",
                "src/main.ts": "import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\nimport { AppModule } from './app/app.module';\n\nplatformBrowserDynamic().bootstrapModule(AppModule)\n  .catch(err => console.error(err));\n",
                "src/app/app.module.ts": "import { NgModule } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { }\n",
                "src/app/app.component.ts": "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  templateUrl: './app.component.html',\n  styleUrls: ['./app.component.css']\n})\nexport class AppComponent {\n  title = 'Angular Starter';\n}\n",
                "src/app/app.component.html": "<h1>{{ title }}</h1>\n"
            }
        },
        {
            "id": "nextjs",
            "files": {
                "README.md": "# Next.js Starter\n\nThis template provides a minimal setup for a Next.js application.\n",
                "package.json": "{\n  \"name\": \"nextjs-starter\",\n  \"version\": \"0.0.0\",\n  \"scripts\": {\n    \"dev\": \"next dev\",\n    \"build\": \"next build\",\n    \"start\": \"next start\"\n  },\n  \"dependencies\": {\n    \"next\": \"latest\",\n    \"react\": \"latest\",\n    \"react-dom\": \"latest\"\n  }\n}\n",
                "next.config.js": "module.exports = {};\n",
                "pages/index.js": "export default function Home() {\n  return <h1>Next.js Starter</h1>;\n}\n"
            }
        },
        {
            "id": "nuxtjs",
            "files": {
                "README.md": "# Nuxt.js Starter\n\nThis template provides a minimal setup for a Nuxt.js application.\n",
                "package.json": "{\n  \"name\": \"nuxtjs-starter\",\n  \"version\": \"0.0.0\",\n  \"scripts\": {\n    \"dev\": \"nuxt dev\",\n    \"build\": \"nuxt build\",\n    \"start\": \"nuxt start\"\n  },\n  \"dependencies\": {\n    \"nuxt\": \"latest\"\n  }\n}\n",
                "nuxt.config.js": "export default {\n  ssr: true,\n  target: 'server'\n};\n",
                "pages/index.vue": "<template>\n  <h1>Nuxt.js Starter</h1>\n</template>\n"
            }
        },
        {
            "id": "express-node",
            "files": {
                "README.md": "# Express + Node.js Starter\n\nThis template provides a minimal setup for an Express.js application running on Node.js.\n",
                ".gitignore": "node_modules\nlogs\n",
                "package.json": "{\n  \"name\": \"express-node-starter\",\n  \"version\": \"0.0.0\",\n  \"scripts\": {\n    \"start\": \"node server.js\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.18.0\"\n  }\n}\n",
                "server.js": "const express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello from Express!');\n});\n\napp.listen(PORT, () => {\n  console.log(`Server running on http://localhost:${PORT}`);\n});\n"
            }
        },
        {
            "id": "vite-sveltekit",
            "files": {
                "README.md": "# SvelteKit + Vite Starter\n\nThis template provides a minimal setup for a SvelteKit application using Vite.\n",
                "package.json": "{\n  \"name\": \"sveltekit-starter\",\n  \"version\": \"0.0.0\",\n  \"scripts\": {\n    \"dev\": \"svelte-kit dev\",\n    \"build\": \"svelte-kit build\",\n    \"preview\": \"svelte-kit preview\"\n  },\n  \"dependencies\": {\n    \"@sveltejs/kit\": \"next\",\n    \"svelte\": \"^3.44.0\"\n  },\n  \"devDependencies\": {\n    \"@sveltejs/adapter-auto\": \"next\",\n    \"vite\": \"^5.0.0\"\n  }\n}\n",
                "svelte.config.js": "import adapter from '@sveltejs/adapter-auto';\n\nexport default {\n  kit: {\n    adapter: adapter()\n  }\n};\n",
                "src/routes/+page.svelte": "<script>\n  let count = 0;\n</script>\n\n<main>\n  <h1>SvelteKit Starter</h1>\n  <button on:click={() => count++}>Count: {count}</button>\n</main>\n"
            }
        },
        {
            "id": "vite-vue",
            "files": {
                "README.md": "# Vue 3 + Vite Starter\n\nThis template provides a minimal setup for a Vue 3 application using Vite.\n",
                "package.json": "{\n  \"name\": \"vite-vue-starter\",\n  \"version\": \"0.0.0\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"vue\": \"^3.2.0\"\n  },\n  \"devDependencies\": {\n    \"vite\": \"^5.0.0\",\n    \"@vitejs/plugin-vue\": \"^4.0.0\"\n  }\n}\n",
                "vite.config.js": "import { defineConfig } from 'vite';\nimport vue from '@vitejs/plugin-vue';\n\nexport default defineConfig({\n  plugins: [vue()]\n});\n",
                "index.html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Vue 3 + Vite Starter</title>\n</head>\n<body>\n  <div id=\"app\"></div>\n  <script type=\"module\" src=\"/src/main.js\"></script>\n</body>\n</html>\n",
                "src/main.js": "import { createApp } from 'vue';\nimport App from './App.vue';\n\ncreateApp(App).mount('#app');\n",
                "src/App.vue": "<template>\n  <h1>Hello Vue 3 + Vite</h1>\n</template>\n<script setup>\n</script>\n"
            }
        },
        {
            "id": "vite-solid",
            "files": {
                "README.md": "# SolidJS + Vite Starter\n\nThis template provides a minimal setup for a SolidJS application using Vite.\n",
                "package.json": "{\n  \"name\": \"vite-solid-starter\",\n  \"version\": \"0.0.0\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"solid-js\": \"^1.5.0\"\n  },\n  \"devDependencies\": {\n    \"vite\": \"^5.0.0\",\n    \"vite-plugin-solid\": \"^2.0.0\"\n  }\n}\n",
                "vite.config.js": "import { defineConfig } from 'vite';\nimport solid from 'vite-plugin-solid';\n\nexport default defineConfig({\n  plugins: [solid()],\n  build: { target: 'esnext' }\n});\n",
                "index.html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>SolidJS + Vite Starter</title>\n</head>\n<body>\n  <div id=\"root\"></div>\n  <script type=\"module\" src=\"/src/index.jsx\"></script>\n</body>\n</html>\n",
                "src/index.jsx": "import { render } from 'solid-js/web';\nimport App from './App';\n\nrender(() => <App />, document.getElementById('root'));\n",
                "src/App.jsx": "function App() {\n  return <h1>Hello SolidJS + Vite</h1>;\n}\n\nexport default App;\n"
            }
        },
        {
            "id": "remix",
            "files": {
                "README.md": "# Remix Starter\n\nThis template provides a minimal setup for a Remix application.\n",
                "package.json": "{\n  \"name\": \"remix-starter\",\n  \"version\": \"0.0.0\",\n  \"scripts\": {\n    \"dev\": \"remix dev\",\n    \"build\": \"remix build\",\n    \"start\": \"remix-serve build\"\n  },\n  \"dependencies\": {\n    \"@remix-run/node\": \"latest\",\n    \"@remix-run/react\": \"latest\",\n    \"@remix-run/serve\": \"latest\",\n    \"react\": \"latest\",\n    \"react-dom\": \"latest\"\n  }\n}\n",
                "remix.config.js": "module.exports = {\n  appDirectory: \"app\",\n  ignoredRouteFiles: [\".*\"],\n  serverBuildPath: \"build/index.js\",\n  publicPath: \"/build/\"\n};\n",
                "app/root.jsx": "import { Links, LiveReload, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';\n\nexport default function App() {\n  return (\n    <html lang=\"en\">\n      <head>\n        <meta charSet=\"utf-8\" />\n        <title>Remix Starter</title>\n        <Links />\n      </head>\n      <body>\n        <Outlet />\n        <ScrollRestoration />\n        <Scripts />\n        <LiveReload />\n      </body>\n    </html>\n  );\n}\n",
                "app/routes/index.jsx": "export default function Index() {\n  return <h1>Welcome to Remix</h1>;\n}\n"
            }
        }
    ];
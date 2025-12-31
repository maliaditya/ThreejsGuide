# Markdown Viewer Web Page

https://maliaditya.github.io/Documentation/#

This project is a web page that allows users to load and view Markdown files with live preview functionality. It uses `markdown-it` for rendering Markdown, and both `Prism.js` and `Highlight.js` for syntax highlighting in code blocks. The page also provides a responsive layout with a table of contents and a file list for easy navigation.

![alt text](image-1.png)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Support](#support)
- [License](#license)

## Features

- Live Markdown rendering and preview.
- Syntax highlighting for code blocks with Prism.js and Highlight.js.
- A responsive and toggleable sidebar for navigation.
- Table of contents (TOC) generation based on headers within Markdown files.
- Utterances integration for GitHub-based comments.
- Support section with links to Buy Me a Coffee and YouTube channel.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/maliaditya/Documentation.git
    ```

2. Open the project in Visual Studio Code or any other code editor.

3. Launch a live server. If you're using Visual Studio Code, you can use the `Live Server` extension to open `index.html`.

4. The project should automatically open in your browser at [http://localhost:5501/index.html](http://localhost:5501/index.html).

## Usage

### Markdown Rendering

- The web page allows users to load Markdown files listed in the `config.json` file.
- You can click on the file links in the sidebar to switch between different Markdown files.
- The sidebar and Table of Contents (TOC) can be toggled using the buttons located in the top-left and top-right corners of the page.

### Syntax Highlighting

- Prism.js and Highlight.js are integrated to support syntax highlighting for code blocks in various languages.
- Code blocks within the Markdown files are automatically highlighted based on the language defined.

## Configuration

This project relies on a `config.json` file for specifying the Markdown files and page details. Below is an example configuration:

```json
{
   {
  "pageTitle": "Documentation.",
  "pageHeader": "Testing Documentation",
  "utterances": {
    "repo": "maliaditya/Documentation",
    "issueTerm": "pathname",
    "issueNumber": null,
    "theme": "github-dark"
  },
  "default_markdown":"Coding Standards.md",
  "markdownFiles": [
    {
      "fileName": "C++ Style Guide.md",
      "displayName": "C++ Style Guide"
    },
    {
      "fileName": "Commonly Used Types.md",
      "displayName": "Commonly Used Types"
    },
    {
      "fileName": "Coding Standards.md",
      "displayName": "Coding Standards"
    }
  ]
}

}

```
### Fields Explanation:

- **pageTitle**: The title displayed in the browser tab.
- **pageHeader**: The main header text displayed at the top of the page.
- **default_markdown**: The default Markdown file loaded when the page is first opened.
- **markdownFiles**: A list of Markdown files to load into the sidebar for navigation.
- **utterances**: Configuration for adding GitHub-based comments via the Utterances widget.

### Dependencies

The project relies on the following libraries and assets:

- [markdown-it](https://github.com/markdown-it/markdown-it) for rendering Markdown.
- [Prism.js](https://prismjs.com/) and [Highlight.js](https://highlightjs.org/) for syntax highlighting.
- [Google Fonts (Roboto)](https://fonts.google.com/specimen/Roboto) for typography.
- [Utterances](https://utteranc.es/) for enabling a GitHub comment section.

All dependencies are loaded via CDN, so no additional installation steps are required.

### Support

If you enjoy this project and would like to support my work, feel free to check out the following links:

- [Buy Me a Coffee](https://www.buymeacoffee.com/adityamali98)
- [GFX Programming YouTube Channel](https://www.youtube.com/@GFX-Programming)

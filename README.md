React Clui is a [WIP] customizable React component to make [CLUI](https://blog.repl.it/clui) development stupid simple

Planned features:

- Basic:

  - Autocompletion + autosuggestion of terminal commands
  - Keyboard navigation of past commands using up and down arrow key
  - Add new commands and corresponding CLUI elements via component props or _live via the command line itself_
  - Commands for editing theme / settings (`set color [color]` with corresponding form elements)
  - Serialize state
  - Effortless copy-paste

- Eventually, probably as optional add-ons:

  - In-memory file system
  - Built-in commands like `ls`, `cd`, `head`, `cat`, `echo`, `rm` and more

- Long term + exciting + the reason for doing this
  - Commands for splitting windows and pinning output (like a more accessible tmux)
  - Easily connect external services (replit wrote a cool graphql library for this) - basically someone should be able to write a small API specification and a corresponding command, pass it into the command tree, and use it as they would any other command
  - logic for composing and piping commands (I think could be built on top of replit's clui-input library)

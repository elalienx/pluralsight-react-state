# Quick Start

Install the latest Node LTS from [nodejs.org](https://nodejs.org/).

Then, run the following commands in your terminal:

```bash
npm install
npm start
```

This will start the app and the mock API server on [http://localhost:3000](http://localhost:3000).

## Learnings

Here’s the revised table with the cons listed as bullet points within the cells:

Here’s a table summarizing the pros and cons of Zustand, Jotai, and Valtio:

| Library | Pros ✅                                       | Cons ❌                                                                      |
| ------- | --------------------------------------------- | ---------------------------------------------------------------------------- |
| Zustand | Only imports project files, not node modules. | Store can become long and messy due to lack of separate reducer files.       |
| Jotai   | Requires few lines of code.                   | Can mutate state without oversight.                                          |
|         |                                               | Must import a node module (`useAtom`) in addition to the store (`cartAtom`). |
| Valtio  | Better separation of state and actions.       | Snapshots are read-only; state must be cloned before passing to actions.     |
|         |                                               | Mutable code contradicts its intended use.                                   |
|         |                                               | No abstraction for persistence (local storage).                              |

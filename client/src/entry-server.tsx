/* Electric Blueprint static rendering: emit the exact React route tree for crawler-visible GitHub Pages HTML. */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export function render(pathname: string) {
  return renderToString(
    <Router ssrPath={pathname}>
      <App />
    </Router>,
  );
}

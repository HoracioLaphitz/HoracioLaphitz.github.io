import { visit } from "unist-util-visit";

export function remarkZoomableImages() {
  return (tree) => {
    visit(tree, "image", (node, index, parent) => {
      if (index === null || !parent) return;
      const htmlNode = {
        type: "html",
        value: `<ZoomableImage src="${node.url}" alt="${node.alt ?? ""}" />`,
      };
      parent.children[index] = htmlNode;
    });
  };
}

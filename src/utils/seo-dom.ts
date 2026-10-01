import { renderSeoHead } from "./seo";

export function updatePageSeo(path: string) {
  const template = document.createElement("template");
  template.innerHTML = renderSeoHead(path);
  document.head.querySelectorAll("[data-seo]").forEach((element) => element.remove());
  document.head.append(template.content);
}

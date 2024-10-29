import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    category: { type: "list", of: { type: "string" }, required: true },
    cover: { type: "string", required: true },
    thumb: { type: "string", required: true },
    link: { type: "string", required: false },
  },
}));

export default makeSource({
  contentDirPath: "./src/blogs",
  documentTypes: [Post],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrettyCode, { theme: "nord" }],
    ],
  },
});

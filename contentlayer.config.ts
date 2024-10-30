import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blogs/**/*.md`,
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

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `posts/**/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    category: { type: "list", of: { type: "string" }, required: true },
    cover: { type: "string", required: true },
    thumb: { type: "string", required: true },
  },
}));

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: "everforest-dark",
  keepBackground: false,
};

export default makeSource({
  contentDirPath: "src",
  documentTypes: [Blog, Project],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrettyCode, options],
    ],
  },
});

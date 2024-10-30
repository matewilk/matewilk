import { createSlug, filterPostsByPage, sortPostByDate } from ".";
import { allBlogs, Blog, allProjects, Project } from "contentlayer/generated";

const LIMIT = 6;

export type BlogPost = {
  title: string;
  date: string;
  category: Array<string>;
  cover: string;
  thumb: string;
  link?: string;
  slug: string;
  imagegallery?: Array<string>;
  videogallery?: Array<string>;
  type?: "project" | "blog";
};

// Get all post
const getAllPosts = (urlPath: string = "posts"): Array<Blog | Project> => {
  return urlPath === "posts" ? allProjects : allBlogs;
};

// Get all posts data
const getAllPostsData = (urlPath: string): Array<Blog | Project> => {
  const posts = getAllPosts(urlPath);
  return posts.sort(sortPostByDate);
};

// Get posts by page
const getPostsByPage = ({
  page,
  limit = LIMIT,
}: {
  page: number;
  limit?: number;
}) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const posts = allProjects
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(start, end);

  return {
    posts,
    hasMore: end < allProjects.length,
  };
};

const getPostsPageParams = (): Array<{ params: { slug: string } }> => {
  const pages = Math.ceil(allProjects.length / LIMIT);
  return Array.from({ length: pages }, (_, i) => ({
    params: { slug: String(i + 1) },
  }));
};

const getBlogsByPage = ({
  page,
  limit = LIMIT,
}: {
  page: number;
  limit?: number;
}) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const blogs = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(start, end);

  return {
    blogs,
    hasMore: end < allBlogs.length,
  };
};

const getBlogsPageParams = (): Array<{ params: { slug: string } }> => {
  const pages = Math.ceil(allBlogs.length / LIMIT);
  return Array.from({ length: pages }, (_, i) => ({
    params: { slug: String(i + 1) },
  }));
};

const getSingleBlog = (slug: string): Blog | undefined => {
  const post = allBlogs.find(
    (post) => post._raw.sourceFileName.replace(".md", "") === slug
  );
  return post;
};

// Get single post data
const getSinglePost = (slug: string): Project | undefined => {
  return allProjects.find(
    (post) => post._raw.sourceFileName.replace(".md", "") === slug
  );
};

// Get all Categories
const getAllCategories = (urlPath = "posts") => {
  const posts = getAllPostsData(urlPath);

  const categories = posts.map((post) => post.category);

  return categories.flat();
};

// Get all posts by category
const getPostsByCategory = ({
  urlPath = "posts",
  category,
  page = 1,
  limit = LIMIT,
}) => {
  const allPosts = urlPath === "posts" ? allProjects : allBlogs;

  const filteredPosts = allPosts.filter((post) => {
    const temp = post.category.map((cat) => createSlug(cat));
    return temp.includes(category);
  });

  const posts = filterPostsByPage(filteredPosts, page, limit);

  return {
    posts,
    hasMore: limit * page < filteredPosts.length,
  };
};

// Get recent posts
const getRecentPosts = (urlPath = "posts") => {
  const allPosts = urlPath === "posts" ? allProjects : allBlogs;

  return allPosts.slice(0, 5);
};

export {
  getPostsByPage,
  getPostsPageParams,
  getBlogsByPage,
  getBlogsPageParams,
  getSingleBlog,
  getPostsByCategory,
  getSinglePost,
  getAllCategories,
  getRecentPosts,
};

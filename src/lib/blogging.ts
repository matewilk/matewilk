import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { createSlug, filterPostsByPage, sortPostByDate } from ".";

const LIMIT = 6;

export type BlogPost = {
  title: string;
  date: string;
  category: Array<string>;
  cover: string;
  thumb: string;
  link: string;
  slug: string;
  imagegallery: Array<string>;
  videogallery: Array<string>;
  type?: "project" | "blog";
};

// Get all post
const getAllPosts = (urlPath: string): Array<string> => {
  return fs.readdirSync(path.join(process.cwd(), `src/${urlPath}`));
};

// get all posts slug
const getAllPostsSlug = (urlPath: string): Array<string> => {
  const files = getAllPosts(urlPath);
  return files.map((filename) => filename.replace(/\.(md|mdx)$/, ""));
};

// Get all posts data
const getAllPostsData = (urlPath: string): Array<BlogPost> => {
  const files = getAllPosts(urlPath);
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");

    const markdownWithMeta = fs.readFileSync(
      path.join(process.cwd(), `src/${urlPath}`, filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      ...frontmatter,
    } as BlogPost;
  });
  return posts.sort(sortPostByDate);
};

// Get posts by page
const getPostsByPage = ({
  page = 1,
  limit = 6,
  urlPath = "posts",
}): { hasMore: boolean; posts: Array<BlogPost> } => {
  const tempPosts = getAllPostsData(urlPath);
  const posts = filterPostsByPage(tempPosts, page, limit);
  return {
    posts,
    hasMore: limit * page < tempPosts.length,
  };
};

// Get all posts path (for nextjs getStaticPaths)
const getPostsPath = (urlPath = "posts") => {
  const postsSlug = getAllPostsSlug(urlPath);

  const paths = postsSlug.map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });

  return paths;
};

// Get single post data
const getSinglePost = (slug: string) => {
  const post = fs.readFileSync(
    path.join(process.cwd(), "src/posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(post);
  return {
    ...(frontmatter as BlogPost),
    content,
  };
};

// Get all Categories
const getAllCategories = (urlPath = "posts") => {
  const posts = getAllPostsData(urlPath);

  const categories = posts.map((post) => post.category);

  return categories.flat();
};

// Get category paths (for nextjs getStaticPaths)
const getCategoryPaths = (urlPath = "posts") => {
  const allPosts = getAllPostsData(urlPath);
  const allCategories = getAllCategories(urlPath);
  const categories = [...new Set(allCategories)];
  const paths = categories.map((category) => {
    const filteredPosts = allPosts.filter((post) => {
      const temp = post.category.map((cat) => createSlug(cat));
      return temp.includes(category.toLowerCase());
    });
    const pages = Math.ceil(filteredPosts.length / LIMIT);

    let tempPath: Array<{ params: { slug: string; page: string } }> = [];
    for (let i = 1; i <= pages; i++) {
      tempPath.push({
        params: {
          slug: category.toLowerCase(),
          page: String(i),
        },
      });
    }
    return tempPath;
  });

  return paths.flat();
};

// Get all posts by category
const getPostsByCategory = ({
  urlPath = "blogs",
  category,
  page = 1,
  limit = 6,
}) => {
  const allPosts = getAllPostsData(urlPath);

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
  const allPosts = getAllPostsData(urlPath);

  return allPosts.slice(0, 5);
};

export {
  getPostsByPage,
  getPostsByCategory,
  getPostsPath,
  getSinglePost,
  getAllCategories,
  getCategoryPaths,
  getRecentPosts,
};

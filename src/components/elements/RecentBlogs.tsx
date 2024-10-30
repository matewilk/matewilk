import { Blog, Project } from "contentlayer/generated";
import Link from "next/link";

export const RecentBlogs = ({
  posts,
  type,
}: {
  posts: Array<Blog | Project>;
  type: "blogs" | "projects";
}) => {
  return (
    <>
      <h5 className="border-b border-white border-opacity-20 pb-2 font-medium text-primary">
        {type === "projects" ? "Latest Projects" : "Recent Blogs"}
      </h5>
      <ul className="mb-0 list-none pl-0">
        {posts.map((post, index) => {
          const postDate = post.date ? new Date(post.date) : null;

          const isBlogPost = "link" in post;
          const href =
            isBlogPost && post.link
              ? post.link
              : type === "blogs"
              ? `/blog/${post._raw?.sourceFileName?.replace(".md", "")}`
              : `/project/${post._raw?.sourceFileName?.replace(".md", "")}`;

          const isExternal = isBlogPost && post.link?.startsWith("http");

          return (
            <li key={`${type}-${index}`} className="mb-4 last:mb-0">
              <p className="mb-0">
                <Link
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  className="text-heading no-underline hover:text-primary hover:underline"
                >
                  {post.title}
                </Link>
              </p>
              {postDate && (
                <small className="text-body">
                  {postDate.toLocaleDateString("en-us", { month: "short" })}{" "}
                  {postDate.toLocaleDateString("en-us", { day: "2-digit" })},{" "}
                  {postDate.getFullYear()}
                </small>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

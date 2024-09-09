import Link from "next/link";

import { BlogPost } from "src/lib/blogging";

export const RecentBlogs = ({
  posts,
  type,
}: {
  posts: Array<BlogPost>;
  type: "blogs" | "projects";
}) => {
  return (
    <>
      <h5 className="border-b border-white border-opacity-20 pb-2 font-medium text-primary">
        {type === "projects" ? "Latest Projects" : "Recent Blogs"}
      </h5>
      <ul className="mb-0 list-none pl-0">
        {posts.map((post, index) => (
          <li key={index} className="mb-4 last:mb-0">
            <p className="mb-0">
              <Link
                href={
                  type === "blogs" ? `${post.link}` : `/project/${post.slug}`
                }
                className="text-heading no-underline hover:text-primary hover:underline"
              >
                {post.title}{" "}
              </Link>
            </p>
            <small className="text-body">
              {`${new Date(post.date).toLocaleDateString("en-us", {
                month: "short",
              })} ${new Date(post.date).toLocaleDateString("en-us", {
                day: "2-digit",
              })}, ${new Date(post.date).getFullYear()}`}
            </small>
          </li>
        ))}
      </ul>
    </>
  );
};

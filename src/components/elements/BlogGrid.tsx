import Link from "next/link";

import BlogTile from "src/components/elements/BlogTile";
import Breadcrumb from "src/components/elements/Breadcrumb";
import { childrenAnimation } from "src/lib/motion";
import { Motion } from "src/components/utils/MotionWrapper";
import { Categories } from "src/components/elements/Categories";
import { RecentBlogs } from "./RecentBlogs";
import { BreadcrumbPath } from "src/components/elements/Breadcrumb";
import { Blog, Project } from "contentlayer/generated";

type BlogGridProps = {
  type: "projects" | "blogs";
  breadcrumb: Array<BreadcrumbPath>;
  page: string;
  posts: Array<Blog | Project>;
  hasMore: boolean;
  categories: Array<string>;
  recentPosts: Array<Blog | Project>;
};

export const BlogGrid = ({
  type,
  breadcrumb,
  page,
  posts,
  hasMore,
  categories,
  recentPosts,
}: BlogGridProps) => {
  return (
    <>
      <Breadcrumb
        title={type === "projects" ? "Projects" : "Blogs"}
        paths={breadcrumb}
        blurred={true}
      />
      <div className="blogs py-24 lg:py-28 xl:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-9">
              <div className="grid grid-cols-2 gap-7">
                {posts &&
                  posts?.map((post, index) => (
                    <Motion
                      type="div"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * index }}
                      variants={childrenAnimation}
                      className="col-span-2 sm:col-span-1"
                      key={index}
                    >
                      <BlogTile
                        {...{
                          ...post,
                          slug: post._raw.sourceFileName.replace(".md", ""),
                          type: type === "projects" ? "project" : "blog",
                        }}
                      />
                    </Motion>
                  ))}
              </div>
              <div className="flex gap-3 pt-10 text-center">
                {page !== "1" && (
                  <Link
                    href={`/${type}/${String(parseInt(page) - 1)}`}
                    className="btn btn-small"
                  >
                    <span>Prev</span>
                  </Link>
                )}
                {hasMore && (
                  <Link
                    href={`/${type}/${String(parseInt(page) + 1)}`}
                    className="btn btn-small"
                  >
                    <span>Next</span>
                  </Link>
                )}
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <div className="widget sticky top-[107px] mt-8 space-y-10 lg:mt-0">
                <Motion
                  type="div"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  variants={childrenAnimation}
                  className="widget widget-category card rounded p-4"
                >
                  <Categories categories={categories} type={type} />
                </Motion>
                <Motion
                  type="div"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  variants={childrenAnimation}
                  className="widget widget-recentpost card rounded p-4"
                >
                  <RecentBlogs posts={recentPosts} type={type} />
                </Motion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

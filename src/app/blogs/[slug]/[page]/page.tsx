import Link from "next/link";

import { Motion } from "../../../../components/utils/MotionWrapper";
import Blog from "../../../../components/elements/Blog";
import Breadcrumb from "../../../../components/elements/Breadcrumb";
import {
  getAllCategories,
  getCategoryPaths,
  getPostsByCategory,
  getRecentPosts,
} from "../../../../lib/blogging";
import { childrenAnimation } from "../../../../lib/motion";
import { createSlug } from "../../../../lib";

type CategoryPostsProps = {
  params: {
    slug: string;
    page: string;
  };
};

const CategoryPosts = ({ params: { slug, page } }: CategoryPostsProps) => {
  const { posts, hasMore } = getPostsByCategory({
    urlPath: "blogs",
    category: slug,
    page: parseInt(page),
    limit: 6,
  });
  const categories = getAllCategories("blogs");
  const recentPosts = getRecentPosts("blogs");

  const uniqueCategories = [...new Set(categories)];

  const pageNumber = Array.isArray(page) ? page[0] : page ?? "1";

  if (!posts) return null;

  return (
    <>
      <Breadcrumb
        title={slug}
        paths={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Projects",
            link: "/blogs/1",
          },
          {
            name: slug,
            link: "",
          },
        ]}
        blurred={true}
      />
      <div className="blogs py-24 lg:py-28 xl:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-9">
              <div className="grid grid-cols-2 gap-7">
                {posts?.map((post, index) => (
                  <Motion
                    type="div"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * index }}
                    variants={childrenAnimation}
                    className="col-span-2 md:col-span-1"
                    key={index}
                  >
                    <Blog {...post} />
                  </Motion>
                ))}
              </div>
              <div className="flex gap-3 pt-10 text-center">
                {pageNumber !== "1" && (
                  <Link
                    legacyBehavior
                    href={`/projects/${slug}/${String(
                      parseInt(pageNumber) - 1
                    )}`}
                  >
                    <a className="btn btn-small">
                      <span>Prev</span>
                    </a>
                  </Link>
                )}
                {hasMore && (
                  <Link
                    legacyBehavior
                    href={`/projects/${slug}/${String(
                      parseInt(pageNumber) + 1
                    )}`}
                  >
                    <a className="btn btn-small">
                      <span>Next</span>
                    </a>
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
                  <h5 className="border-b border-white border-opacity-20 pb-2 font-medium text-primary">
                    Categories
                  </h5>
                  <ul className="styledlist mb-0 list-none pl-0">
                    {uniqueCategories.map((category, i) => (
                      <li key={i}>
                        <Link
                          legacyBehavior
                          href={`/projects/${createSlug(category)}/1`}
                        >
                          <a className="clearfix hover:text-primary">
                            {category}
                            <span className="float-right">
                              (
                              {
                                categories.filter((cat) => cat === category)
                                  .length
                              }
                              )
                            </span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
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
                  <h5 className="border-b border-white border-opacity-20 pb-2 font-medium text-primary">
                    Recent Posts
                  </h5>
                  <ul className="mb-0 list-none pl-0">
                    {recentPosts.map((post, index) => (
                      <li key={index} className="mb-4 last:mb-0">
                        <p className="mb-0">
                          <Link
                            legacyBehavior
                            href={
                              post.link
                                ? post.link
                                : `/postdetails/${post.slug}`
                            }
                          >
                            <a
                              target="_blank"
                              className="text-heading no-underline hover:text-primary hover:underline"
                            >
                              {post.title}{" "}
                            </a>
                          </Link>
                        </p>
                        <small className="text-body">
                          {`${new Date(post.date).toLocaleDateString("en-us", {
                            month: "short",
                          })} ${new Date(post.date).toLocaleDateString(
                            "en-us",
                            {
                              day: "2-digit",
                            }
                          )}, ${new Date(post.date).getFullYear()}`}
                        </small>
                      </li>
                    ))}
                  </ul>
                </Motion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPosts;

// export function getStaticPaths() {
//   const paths = getCategoryPaths("posts");

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export function getStaticProps({ params: { slug, page } }) {
//   const { posts, hasMore } = getPostsByCategory({
//     urlPath: "blog",
//     category: slug,
//     page,
//     limit: 6,
//   });
//   const categories = getAllCategories("blog");
//   const recentPosts = getRecentPosts("blog");

//   return {
//     props: {
//       posts,
//       hasMore,
//       categories,
//       recentPosts,
//     },
//     revalidate: 10,
//   };
// }

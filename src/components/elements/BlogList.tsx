import Link from "next/link";
import Blog from "../../components/elements/Blog";
import Breadcrumb from "../../components/elements/Breadcrumb";
import { createSlug } from "../../lib";
import { BlogPost } from "../../lib/blogging";
import { childrenAnimation } from "../../lib/motion";
import { Motion } from "../../components/utils/MotionWrapper";

type PostsProps = {
  type: "posts" | "blogs";
  page: string;
  posts: Array<BlogPost>;
  hasMore: boolean;
  categories: Array<string>;
  recentPosts: Array<BlogPost>;
};

export const BlogList = ({
  type,
  page,
  posts,
  hasMore,
  categories,
  recentPosts,
}: PostsProps) => {
  const uniqueCategories = [...new Set(categories)];
  return (
    <>
      <Breadcrumb
        title="Blogs"
        paths={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: type === "posts" ? "Projects" : "Blogs",
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
                      <Blog {...post} />
                    </Motion>
                  ))}
              </div>
              <div className="flex gap-3 pt-10 text-center">
                {page !== "1" && (
                  <Link
                    legacyBehavior
                    href={`/posts/${String(parseInt(page) - 1)}`}
                  >
                    <a className="btn btn-small">
                      <span>Prev</span>
                    </a>
                  </Link>
                )}
                {hasMore && (
                  <Link
                    legacyBehavior
                    href={`/posts/${String(parseInt(page) + 1)}`}
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
                          href={`/blogcategory/${createSlug(category)}/1`}
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
                            href={`/postdetails/${post.slug}`}
                          >
                            <a className="text-heading no-underline hover:text-primary hover:underline">
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

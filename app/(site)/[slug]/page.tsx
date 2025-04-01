import { getSlugType } from "@/sanity/sanity-utils";
import PostListComponent from "../components/PostListComponent";
import ServiceDetailComponent from "../components/ServiceDetailComponent";
import notFound from "../[...not-found]/page";

export default async function PostPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await(params)).slug
  const slugType = await getSlugType(slug);
  const filter = `*[_type == "category" && slug.current == "${slug}"][0]._id in categories[]._ref`;
  const page = slugType && slugType == "service" ? await ServiceDetailComponent({slug})  : await PostListComponent({slug, filter});
  if (!slugType) {
    return notFound();
  }
  return (
    page && page
  );
}
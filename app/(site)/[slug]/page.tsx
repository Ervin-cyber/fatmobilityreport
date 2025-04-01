import { getSlugType } from "@/sanity/sanity-utils";
import PostListComponent from "../components/PostListComponent";
import ServiceDetailComponent from "../components/ServiceDetailComponent";
import notFound from "../[...not-found]/page";

export default async function PostPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await(params)).slug
  const slugType = await getSlugType(slug);
  const page = slugType && slugType == "service" ? await ServiceDetailComponent({slug})  : await PostListComponent({slug});
  if (!slugType) {
    return notFound();
  }
  return (
    page && page
  );
}
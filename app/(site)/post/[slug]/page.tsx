import PostDetailComponent from "../../components/PostDetailComponent";
import notFound from "../../[...not-found]/page";

export default async function PostPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const page =  await PostDetailComponent({params});
  if (!page) {
    return notFound();
  }
  return (
    page && page
  );
}
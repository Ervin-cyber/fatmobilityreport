import PostDetailComponent from "../../components/PostDetailComponent";

export default async function PostPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const page =  await PostDetailComponent({params});
  return (
    page && page
  );
}
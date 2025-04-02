import PostListComponent from "./components/PostListComponent";

export const revalidate = 10

export default async function IndexPage() {
  return (
    <PostListComponent filter="" slug={""} />
  );
}
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "t2lmom4m",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,// false to get fresh data
});
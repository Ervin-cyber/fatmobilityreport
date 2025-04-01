import { PortableText } from "next-sanity";
import { PortableTextComponents } from "./PortableTextComponents";
import { getServiceDetail } from "@/sanity/sanity-utils";

export default async function ServiceDetailComponent({slug}: {slug:string}) {
  const service = await getServiceDetail(slug);
  return ( service &&
    <div className="border-y border border-gray-300 p-10">
      <div className="prose">
        <PortableText value={service.body} components={PortableTextComponents}/>      
      </div>
    </div>

  );
}
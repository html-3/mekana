import getNotionClient from "../services/notion";
import { GetServerSideProps } from "next/types";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

type GenerateSiteMapProps = { posts :QueryDatabaseResponse, url: string}

function generateSiteMap({posts, url}:GenerateSiteMapProps) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static URLs manually -->
     <url>
       <loc>${url}</loc>
     </url>
     <url>
       <loc>${url}/about</loc>
     </url>
      <url>
       <loc>${url}/blog</loc>
     </url>
     ${posts.results
       .map(({id}) => {
         return `
           <url>
               <loc>${`${url}/blog/${id}`}</loc>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const notion = getNotionClient();
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    filter: { property: 'published', checkbox: { equals: true } },
    sorts: [],
    page_size:30,
  });
 const url = req.headers.host || 'https://mekana.vercel.app'
  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap({posts, url});
 
  res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  res.write(sitemap);
  res.end();
 
  return {
    props: {},
  };
}

export default function SiteMap() {}  
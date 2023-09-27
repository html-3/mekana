import { Client } from '@notionhq/client';

export default function getNotionClient() {
  const notion = new Client({ auth: process.env.NOTION_KEY as string});
  return notion;
}

export type NotionPost = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: {
    title: { title: [{ plain_text: string }] };
    published: { checkbox: boolean };
    author: {};
    tags: { multi_select: [{ name: string }] };
  };
}
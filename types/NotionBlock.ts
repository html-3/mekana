export type NotionBlock = {
  object: string;
  id: string;
  type: string;
  has_children: boolean;
  archived: boolean;
  parent: {
    type: string;
    page_id: string;
  };
  created_time: string;
  last_edited_time: string;
  heading_1: {
    rich_text: {
      text: {
        content: string;
      };
    }[];
  };
  heading_2: {
    rich_text: {
      text: {
        content: string;
      };
    }[];
  };
  paragraph: {
    rich_text: {
      text: {
        content: string;
      };
    }[];
  };
  image: {
    file: {
      url: string;
    };
  };
};

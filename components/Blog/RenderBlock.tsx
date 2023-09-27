import Image from 'next/image';
import { NotionBlock } from '../../types/NotionBlock';



interface RenderedParams {
  block: NotionBlock;
}

export default function RenderBlock({ block }: RenderedParams) {
  console.log(block);
  switch (block.type) {
    case 'heading_1':
      return <h1>{block.heading_1.rich_text[0].text.content}</h1>;
    case 'heading_2':
      return <h2>{block.heading_2.rich_text[0].text.content}</h2>;

    case 'paragraph':
      return <p>{block.paragraph.rich_text[0].text.content}</p>;
    case 'image':
      console.log(block.image);
      return (
        <Image
          src={block.image.file.url}
          alt={'aaaa'}
          width={500}
          height={500}
        />
      );
    default:
      return <pre>{JSON.stringify(block, null, 2)}</pre>;
  }
}

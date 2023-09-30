import Image from 'next/image';
import { NotionBlock } from '../../types/NotionBlock';

interface RenderedParams {
  block: NotionBlock;
}

export default function RenderBlock({ block }: RenderedParams) {
  console.log(block);
  switch (block.type) {
    case 'heading_1':
      return <h1 className='mt-12'>{block.heading_1.rich_text[0].text.content}</h1>;
    case 'heading_2':
      return <h2 className='mt-12'>{block.heading_2.rich_text[0].text.content}</h2>;

    case 'paragraph':
      return <p className='text-justify mt-4'>{block.paragraph.rich_text[0].text.content}</p>;
    case 'image':
      console.log(block.image);
      return (
        <div className='flex justify-center mt-4'>
          <Image
            src={block.image.file.url}
            className='object-center'
            alt={'aaaa'}
            width={500}
            height={500}
          />
        </div>
      );
    default:
      return <pre>{JSON.stringify(block, null, 2)}</pre>;
  }
}

import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface CardProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardListProps {
  cards: CardProps[];
}

export function CardList({ cards }: CardListProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  function handleViewImage(url: string): void {
    setSelectedImageUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={"40px"}>
        {cards.map((card) => {
          return <Card
            key={card.id}
            data={card}
            viewImage={() => handleViewImage(card.url)}
          />
        })}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={selectedImageUrl} />
    </>
  );
}

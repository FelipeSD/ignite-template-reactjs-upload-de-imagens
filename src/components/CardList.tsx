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
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    setSelectedImageUrl(url);
    onOpen();
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={"40px"}>
        {cards.map((card) => {
          return <Card
            key={card.id}
            data={card}
            viewImage={() => handleViewImage(card.url)}
          />
        })}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={selectedImageUrl} />
    </>
  );
}

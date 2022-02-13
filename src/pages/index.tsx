import {Button, Box} from '@chakra-ui/react';
import {useMemo} from 'react';
import {useInfiniteQuery} from 'react-query';

import {Header} from '../components/Header';
import {CardList} from '../components/CardList';
import {api} from '../services/api';
import {Loading} from '../components/Loading';
import {Error} from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async ({pageParam = null}) => {
    const response = await api.get(`/api/images`, {
      params: {
        after: pageParam
      }
    });

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam(params) {
        return params.after || null;
      },
    }
  );

  const formattedData = useMemo(() => {
    const pagesData = data?.pages;

    if (!pagesData) return [];

    let formattedList = [];

    pagesData.forEach((page) => {
      const formattedDataList = page?.data.map((data) => ({
        title: data.title,
        description: data.description,
        url: data.url,
        ts: data.ts,
        id: data.id,
      }))

      formattedList = [...formattedList, ...formattedDataList];
    })

    return formattedList;
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header/>

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}

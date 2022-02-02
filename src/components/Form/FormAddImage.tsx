import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';
import { api } from '../../services/api';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: v => {
          return v[0].size < 10 * 1024 * 1024 || 'O arquivo deve ser menor que 10MB'
        },
        acceptedFormats: v =>
          /image\/(jpeg|png|gif)/gi.test(v[0].type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    },
    title: {
      required: 'Título obrigatório',
      maxLength: {
        message: 'Máximo de 20 caracteres',
        value: 20,
      },
      minLength: {
        message: 'Mínimo de 2 caracteres',
        value: 2,
      },
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: {
        message: 'Máximo de 65 caracteres',
        value: 65,
      },
    },
  };

  async function addImage(formData): Promise<void> {
    await api.post('/api/images', formData);
  }

  const queryClient = useQueryClient();
  const mutation = useMutation(addImage, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('images');
    },
  });
  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      if (imageUrl) {
        await mutation.mutateAsync({
          url: imageUrl,
          title: data.title,
          description: data.description
        });

        toast({
          title: 'Imagem cadastrada',
          description: 'Sua imagem foi cadastrada com sucesso.',
          status: 'success',
          isClosable: true,
        });
      } else {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'error',
          isClosable: true,
        });
      }
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setImageUrl('');
      setLocalImageUrl('');
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          error={errors.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          error={errors.description}
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}

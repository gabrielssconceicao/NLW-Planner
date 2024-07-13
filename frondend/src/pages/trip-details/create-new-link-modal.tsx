import { Link } from 'lucide-react';
import { Modal } from '../../components/modal';
import { Button } from '../../components/button';
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';

interface CreateNewLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateNewLinkModal({
  closeCreateLinkModal,
}: CreateNewLinkModalProps) {
  const { tripId } = useParams();
  async function createLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title')?.toString();
    const url = data.get('url')?.toString();
    if (!title || !url) {
      return;
    }
    await api.post(`trips/${tripId}/links`, { title, url });
    window.document.location.reload();
  }
  return (
    <Modal
      closeModal={closeCreateLinkModal}
      modalTitle='Cadastrar novo link'
      modalDescription='Crie um link para compartilhar com seus convidados'>
      <form onSubmit={createLink} className='space-y-3'>
        <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
          <input
            type='text'
            name='title'
            placeholder='Nome do link'
            className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
          />
        </div>
        <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
          <Link className='size-5 text-zinc-400' />
          <input
            type='text'
            name='url'
            placeholder='URL do link'
            className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
          />
        </div>
        <Button variant='primary' size='full' type='submit'>
          Cadastrar
        </Button>
      </form>
    </Modal>
  );
}

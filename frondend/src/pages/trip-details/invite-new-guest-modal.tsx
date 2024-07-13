import { AtSign } from 'lucide-react';
import { Button } from '../../components/button';
import { Modal } from '../../components/modal';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';

interface InviteNewGuestModalProps {
  closeInviteNewGuestModal: () => void;
}

export function InviteNewGuestModal({
  closeInviteNewGuestModal,
}: InviteNewGuestModalProps) {
  const { tripId } = useParams();
  async function sendInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    if (!name || !email) {
      return;
    }

    await api.post(`trips/${tripId}/invites`, { name, email });
    window.document.location.reload();
  }
  return (
    <Modal
      closeModal={closeInviteNewGuestModal}
      modalTitle='Convidar novo convidado'
      modalDescription='Convide um novo convidado para a viagem'>
      <form onSubmit={sendInvite} className='space-y-3'>
        <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
          <input
            type='text'
            name='name'
            placeholder='Nome do convidado'
            className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
          />
        </div>
        <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
          <AtSign className='size-5 text-zinc-400' />
          <input
            type='email'
            name='email'
            placeholder='Email do convidado'
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

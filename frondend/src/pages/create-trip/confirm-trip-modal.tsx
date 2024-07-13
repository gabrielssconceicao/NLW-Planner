import { User } from 'lucide-react';
import { Button } from '../../components/button';
import { Modal } from '../../components/modal';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: React.FormEvent<HTMLFormElement>) => void;
  setOwnerEmail: (email: string) => void;
  setOwnerName: (name: string) => void;
  destination: string;
  eventStartandEndDates: DateRange | undefined;
}
export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  destination,
  eventStartandEndDates,
}: ConfirmTripModalProps) {
  return (
    <Modal
      modalTitle='Confirmar criação de viagem'
      modalDescription={
        <>
          Para concluir a criação da viagem para{' '}
          <span className='text-zinc-100 font-semibold'>{destination}</span> nas
          datas de
          <span className='text-zinc-100 font-semibold'>
            {' '}
            {eventStartandEndDates?.from &&
              format(eventStartandEndDates?.from, 'd')
                .concat(' de ')
                .concat(
                  format(eventStartandEndDates?.from, 'MMMM', { locale: ptBR })
                )
                .concat(' até ')}
          </span>
          <span className='text-zinc-100 font-semibold'>
            {eventStartandEndDates?.to &&
              format(eventStartandEndDates?.to, 'd')
                .concat(' de ')
                .concat(
                  format(eventStartandEndDates?.to, 'MMMM', { locale: ptBR })
                )
                .concat(' ')
                .concat(format(eventStartandEndDates?.to, 'yyyy'))}
          </span>{' '}
          preecha seus dados abaixo:
        </>
      }
      closeModal={closeConfirmTripModal}>
      <form onSubmit={createTrip} className='space-y-3'>
        <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
          <User className='size-5 text-zinc-400' />
          <input
            onChange={(e) => setOwnerName(e.target.value)}
            type='text'
            name='name'
            placeholder='Seu nome completo'
            className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
          />
        </div>
        <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
          <User className='size-5 text-zinc-400' />
          <input
            onChange={(e) => setOwnerEmail(e.target.value)}
            type='email'
            name='email'
            placeholder='Seu e-mail pessoal'
            className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
          />
        </div>
        <Button type='submit' size='full' variant='primary'>
          Confirmar Criação da viagem
        </Button>
      </form>
    </Modal>
  );
}

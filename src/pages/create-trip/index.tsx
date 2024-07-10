import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    'jessica.white4@yahoo.com',
    'jhonny.white4@yahoo.com',
  ]);

  function openGuestInput() {
    setIsGuestInputOpen(true);
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false);
  }
  function openGuestModal() {
    setIsGuestModalOpen(true);
  }
  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }
  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }
  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailsToInvite(newEmailList);
  }

  function createTrip() {
    navigate('/trips/123');
  }

  return (
    <div className='h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center'>
      <div className='max-w-3xl w-full px-6 text-center space-y-10'>
        <div className='flex flex-col gap-3'>
          <img src='/logo.svg' alt='plann.er' />
          <p className='text-zinc-300 text-lg'>
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className='space-y-4'>
          <div className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3'>
            <div className='flex items-center gap-2 flex-1'>
              <MapPin size={22} className='text-zinc-400' />
              <input
                disabled={isGuestInputOpen}
                type='text'
                placeholder='Para onde você vai?'
                className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
              />
            </div>

            <div className='flex items-center gap-2'>
              <Calendar size={22} className='text-zinc-400' />
              <input
                disabled={isGuestInputOpen}
                type='text'
                placeholder='Quando?'
                className='bg-transparent text-lg placeholder-zinc-400 w-40 outline-none'
              />
            </div>

            <div className='w-px h-6 bg-zinc-800' />

            {isGuestInputOpen ? (
              <button
                className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'
                onClick={closeGuestInput}>
                Alterar local e data
                <Settings2 className='size-5' />
              </button>
            ) : (
              <button
                className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'
                onClick={openGuestInput}>
                Continuar
                <ArrowRight className='size-5' />
              </button>
            )}
          </div>

          {isGuestInputOpen && (
            <div className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3'>
              <button
                type='button'
                onClick={openGuestModal}
                className='flex items-center gap-2 flex-1 text-left'>
                <UserRoundPlus size={22} className='text-zinc-400' />
                {emailsToInvite.length ? (
                  <span className='text-zinc-100 text-lg flex-1'>
                    {emailsToInvite.length} pessoa(s) convidada(s)
                  </span>
                ) : (
                  <span className='text-zinc-400 text-lg flex-1'>
                    Quem estará na viagem?
                  </span>
                )}
              </button>

              <div className='w-px h-6 bg-zinc-800' />

              <button
                onClick={openConfirmTripModal}
                className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Confirmar Viagem
                <ArrowRight className='size-5' />
              </button>
            </div>
          )}
        </div>
        <p className='text-sm text-zinc-500'>
          Ao planejar sua viagem pela plann.er vôce automaticamente concorda{' '}
          <br /> com nossos{' '}
          <a href='#' className='text-zinc-300 underline'>
            termos de uso
          </a>{' '}
          e{' '}
          <a href='#' className='text-zinc-300 underline'>
            políticas de privacidade
          </a>
        </p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvite={removeEmailFromInvite}
          closeGuestModal={closeGuestModal}
        />
      )}
      {isConfirmTripModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>
                  Confirmar criação de viagem
                </h2>
                <button onClick={closeConfirmTripModal}>
                  <X className='size-5 text-zinc-400' />
                </button>
              </div>
              <p className='text-sm text-zinc-400'>
                Para concluir a criação da viagem para{' '}
                <span className='text-zinc-100 font-semibold'>
                  Floreanópolis, Brasil
                </span>{' '}
                nas datas de
                <span className='text-zinc-100 font-semibold'></span>
                <span className='text-zinc-100 font-semibold'>
                  {' '}
                  16 a 27 de Agosto de 2024
                </span>{' '}
                preecha seus dados abaixo:
              </p>
            </div>

            <form onSubmit={addNewEmailToInvite} className='space-y-3'>
              <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='size-5 text-zinc-400' />
                <input
                  type='text'
                  name='name'
                  placeholder='Seu nome completo'
                  className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
                />
              </div>
              <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='size-5 text-zinc-400' />
                <input
                  type='email'
                  name='email'
                  placeholder='Seu e-mail pessoal'
                  className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
                />
              </div>
              <button
                onClick={createTrip}
                type='submit'
                className='bg-lime-300 w-full justify-center text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Confirmar Criação da viagem
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

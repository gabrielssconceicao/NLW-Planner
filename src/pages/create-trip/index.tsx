import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
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

  function createTrip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          <DestinationAndDateStep
            isGuestInputOpen={isGuestInputOpen}
            closeGuestInput={closeGuestInput}
            openGuestInput={openGuestInput}
          />
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
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  );
}

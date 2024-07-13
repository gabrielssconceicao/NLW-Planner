import { MapPin, Calendar, Settings2, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/button';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { Input } from '../../../components/input';
import { Modal } from '../../../components/modal';
interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean;
  closeGuestInput: () => void;
  openGuestInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartandEndDates: (dates: DateRange | undefined) => void;
  eventStartandEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
  isGuestInputOpen,
  closeGuestInput,
  openGuestInput,
  setDestination,
  setEventStartandEndDates,
  eventStartandEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartandEndDates &&
    eventStartandEndDates.from &&
    eventStartandEndDates.to
      ? format(eventStartandEndDates.from, "d 'de' LLL")
          .concat(' até ')
          .concat(format(eventStartandEndDates.to, "d 'de' LLL"))
      : null;
  return (
    <div className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3'>
      <div className='flex items-center gap-2 flex-1'>
        <MapPin size={22} className='text-zinc-400' />
        <Input
          disabled={isGuestInputOpen}
          onChange={(event) => setDestination(event.target.value)}
          type='text'
          placeholder='Para onde você vai?'
        />
      </div>

      <button
        onClick={openDatePicker}
        className='flex items-center gap-2 text-left'
        disabled={isGuestInputOpen}>
        <Calendar size={22} className='text-zinc-400 ' />
        <span className='text-lg text-zinc-400  flex-1'>
          {displayedDate || 'Quando?'}
        </span>
      </button>

      <div className='w-px h-6 bg-zinc-800' />

      {isGuestInputOpen ? (
        <Button variant='secondary' onClick={closeGuestInput}>
          Alterar local e data
          <Settings2 className='size-5' />
        </Button>
      ) : (
        <Button variant='primary' onClick={openGuestInput}>
          Continuar
          <ArrowRight className='size-5' />
        </Button>
      )}

      {isDatePickerOpen && (
        <Modal
          closeModal={closeDatePicker}
          modalTitle='Selecione a data'
          size='custon'>
          <DayPicker
            mode='range'
            selected={eventStartandEndDates}
            onSelect={setEventStartandEndDates}
          />
        </Modal>
      )}
    </div>
  );
}

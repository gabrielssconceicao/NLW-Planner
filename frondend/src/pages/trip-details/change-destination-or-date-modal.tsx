import { useState } from 'react';
import { Modal } from '../../components/modal';
import { Calendar, MapPin } from 'lucide-react';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { DateRange, DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';

interface ChangeDestinationOrDateModalProps {
  closeEditTripModal: () => void;
}

export function ChangeDestinationOrDateModal({
  closeEditTripModal,
}: ChangeDestinationOrDateModalProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [destination, setDestination] = useState('');
  const [eventStartandEndDates, setEventStartandEndDates] = useState<
    DateRange | undefined
  >();

  const displayedDate =
    eventStartandEndDates &&
    eventStartandEndDates.from &&
    eventStartandEndDates.to
      ? format(eventStartandEndDates.from, "d 'de' LLL")
          .concat(' até ')
          .concat(format(eventStartandEndDates.to, "d 'de' LLL"))
      : null;

  const { tripId } = useParams();
  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  async function updateTrip() {
    if (!destination) {
      return;
    }
    if (!eventStartandEndDates) {
      return;
    }

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartandEndDates.from,
      ends_at: eventStartandEndDates.to,
    });
    window.document.location.reload();
  }

  return (
    <Modal closeModal={closeEditTripModal} modalTitle='Alterar local e data'>
      <div className='flex items-center space-y-4'>
        <div className='flex items-center gap-2 flex-1'>
          <MapPin size={22} className='text-zinc-400' />
          <Input
            name='destination'
            type='text'
            placeholder='Para onde você vai?'
            onChange={(event) => setDestination(event.target.value)}
          />
          <button
            onClick={openDatePicker}
            className='flex items-center gap-2 text-left'>
            <Calendar size={22} className='text-zinc-400 ' />
            <span className='text-lg text-zinc-400  flex-1'>
              {displayedDate || 'Quando?'}
            </span>
          </button>
        </div>
      </div>
      <Button type='submit' size='full' variant='primary' onClick={updateTrip}>
        Alterar
      </Button>
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
    </Modal>
  );
}

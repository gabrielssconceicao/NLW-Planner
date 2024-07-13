import { CircleCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}
export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);
  return (
    <div className='space-y-8'>
      {activities?.map((activity) => (
        <div key={activity.date} className='space-y-2.5'>
          <div className='flex gap-2 items-baseline'>
            <span className='text-xl text-zinc-300 font-semibold'>
              Dia {format(activity.date, 'd')}
            </span>
            <span className='text-xs text-zinc-500'>
              {format(activity.date, 'EEEE', { locale: ptBR })}
            </span>
          </div>
          {activity.activities.length ? (
            <div className='space-y-2.5'>
              {activity.activities.map((ac) => (
                <div
                  key={ac.id}
                  className='px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3'>
                  <CircleCheck className='size-5 text-lime-300' />
                  <span className='text-zinc-100'>{ac.title}</span>
                  <span className='text-zinc-400 text-sm ml-auto'>
                    {format(ac.occurs_at, 'HH:mm')}h
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-sm text-zinc-500'>
              Nenhuma atividade cadastrada nessa data
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

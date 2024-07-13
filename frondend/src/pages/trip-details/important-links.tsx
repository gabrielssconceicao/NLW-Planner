import { Link2, Plus } from 'lucide-react';
import { Button } from '../../components/button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { CreateNewLinkModal } from './create-new-link-modal';

interface Link {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const { tripId } = useParams();
  const [isCreatingLinkModalOpen, setIsCreatingLinkModalOpen] = useState(false);
  useEffect(() => {
    api.get(`trips/${tripId}/links`).then((response) => {
      setLinks(response.data.links);
      console.log(response.data.links);
    });
  }, [tripId]);

  function openCreateLinkModal() {
    setIsCreatingLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreatingLinkModalOpen(false);
  }

  return (
    <div className='space-y-6'>
      <h2 className='font-semibold text-xl'>Links importantes</h2>
      <div className='space-y-6'>
        {links.map((link) => (
          <div className='flex items-center justify-between gap-4'>
            <div className='space-y-1.5'>
              <span className='block font-medium text-zinc-100'>
                {link.title}
              </span>
              <a
                href='#'
                className='block text-xs text-zinc-400 truncate hover:text-zinc-200'>
                {link.url}
              </a>
            </div>
            <Link2 className='size-5 text-zinc-400 shrink-0' />
          </div>
        ))}
      </div>

      <Button
        variant='secondary'
        size='full'
        type='submit'
        onClick={openCreateLinkModal}>
        <Plus className='size-5' />
        Cadastrar novo link
      </Button>
      {isCreatingLinkModalOpen && (
        <CreateNewLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  );
}

import { X } from 'lucide-react';
import { tv, VariantProps } from 'tailwind-variants';

const modalVariants = tv({
  base: 'rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5',
  variants: {
    size: {
      default: 'w-[640px]',
      custon: '',
    },
  },

  defaultVariants: {
    size: 'default',
  },
});
interface ModalProps extends VariantProps<typeof modalVariants> {
  children: React.ReactNode;
  modalDescription?: React.ReactNode;
  modalTitle: React.ReactNode;
  closeModal: () => void;
}
export function Modal({
  children,
  closeModal,
  modalDescription,
  modalTitle,
  size,
}: ModalProps) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className={modalVariants({ size })}>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>{modalTitle}</h2>
            <button onClick={closeModal}>
              <X className='size-5 text-zinc-400' />
            </button>
          </div>
          <p className='text-sm text-zinc-400'>{modalDescription}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

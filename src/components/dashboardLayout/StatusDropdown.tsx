import React from 'react'
import { Dialog } from '@/src/components/ui/dialog'
import { Lead } from '@/src/lib/types'

export default function StatusDropdown({isOpen, onOpenChange,lead,setNewStatus}: {isOpen: boolean, onOpenChange: (open: boolean) => void, lead: Lead, setNewStatus: (status: string) => void}) {

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'dormant', label: 'Dormant' },
      ];
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <ul className='bg-secondary/75 text-secondary-foreground w-32 rounded-xs text-center p-2 space-y-2.5'>
        {statusOptions.map((option) => (
          <li key={option.value} className={lead.status === option.value ? 'hidden' : 'hover:bg-primary/75 rounded-xs text-md cursor-pointer py-0.5'} onClick={() => {
              setNewStatus(option.value);
              onOpenChange(false);
            }}>
              {option.label}
          </li>
        ))}
      </ul>
    </Dialog>
  )
}

import React from 'react'
import { Dialog, DialogOverlay } from '@/src/components/ui/dialog'
import { User } from '@/src/lib/types'
import { Button } from '@/src/components/ui/button'

export default function MessageDialog({isOpen, onOpenChange, user}: {isOpen: boolean, onOpenChange: (open: boolean) => void, user:User}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogOverlay className='h-screen w-screen flex items-center justify-center z-50'>
      <div className='w-full h-full flex items-center justify-center z-50'>
        <div className='bg-secondary text-primary/80 rounded-lg p-6 shadow-lg w-[600px] h-1/2 flex flex-col justify-evenly'>
          <h2 className='text-md font-semibold mb-4'>{`Message to ${user?.fullname}`}</h2>
          
          <textarea className='text-secondary-foreground placeholder:text-muted-foreground w-full h-32 p-2 rounded-md border border-muted focus:outline-none focus:border-none focus:ring-2 focus:ring-primary' placeholder={`Your message to ${user?.fullname.split(' ')[0]}...`}></textarea>
          
          <div className='flex justify-end mt-4 gap-2'>
            <Button variant={'outline'} onClick={() => onOpenChange(false)} className='text-xs px-4 py-2 text-gray-700 rounded-md hover:bg-gray-400 cursor-pointer'>Cancel</Button>
            <Button variant={'default'} className='text-xs px-4 py-2 cursor-pointer'>{`Send Message to ${user?.fullname.split(' ')[0]}`}</Button>
          </div>
        </div>
      </div>
    </DialogOverlay>
    </Dialog>
  )
}

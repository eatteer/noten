import { useState } from 'react'

export default function useDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = () => {
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }

  return { isOpen, openDrawer, closeDrawer }
}

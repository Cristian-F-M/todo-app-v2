import { ModalTask } from '@components/Modal'
import React, { createContext, useContext, useRef, useState } from 'react'
import { Modalize } from 'react-native-modalize'
import type { ModalType, ModalMode, openModalFC } from 'Modal'
import type { Task } from 'Task'
import type { Folder } from 'Folder'

type ModalContextProps = {
  openModal: openModalFC
  closeModal: (e?: any) => void
  modalRef: React.RefObject<Modalize> | null
}

const ModalContext = createContext<ModalContextProps>({
  openModal: () => {},
  closeModal: () => {},
  modalRef: null,
})

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modalRef = useRef<Modalize>(null)
  const [type, setType] = useState<ModalType>('TASK')
  const [item, setItem] = useState<Task | Folder>()
  const [folderId, setFolderId] = useState<string>()
  const [mode, setMode] = useState<ModalMode>('CREATE')
  const [content, setContent] = useState<React.ReactNode>()
  const [defaultModal, setDefaultModal] = useState(true)

  const openModal: openModalFC = (
    e,
    { type, item, folderId, mode, defaultModal = true, content },
  ) => {
    if (!defaultModal && !content) throw new Error('Content is required')
    if (e) e.persist()
    if (type) setType(type)
    if (item) setItem(item)
    if (folderId) setFolderId(folderId)
    if (mode) setMode(mode)
    if (content) setContent(content)
    if (defaultModal != null) setDefaultModal(defaultModal)

    modalRef.current?.open()
  }

  const closeModal = (e?: any) => {
    if (e) e.persist()
    modalRef.current?.close()
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalRef }}>
      <Modalize
        ref={modalRef}
        modalStyle={{ backgroundColor: '#172554' }}
        adjustToContentHeight
      >
        {defaultModal && (
          <ModalTask
            closeModal={closeModal}
            openModal={openModal}
            type={type}
            item={item}
            folderId={folderId}
            mode={mode}
          />
        )}
        {!defaultModal && content}
      </Modalize>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext)
}

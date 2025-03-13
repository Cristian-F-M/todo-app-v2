export type ModalType = 'TASK' | 'FOLDER'
export type ModalMode = 'CREATE' | 'EDIT'

export type ModalProps = {
  type: ModalType
  openModal: (e, { type, item, folderId }: openModalProps) => void
  closeModal: (e?: any) => void
  item?: Task | Folder
  folderId?: string
  mode: ModalMode
}

export type openModalOptions = {
  type?: ModalType
  item?: Task | Folder
  folderId?: string
  mode: ModalMode
  defaultModal?: boolean
  content?: React.ReactNode
}

export type openModalFC = (
  e?: any,
  { type, item, folderId }: openModalOptions,
) => void

export type ModalType = 'TASK' | 'FOLDER'
export type ModalMode = 'CREATE' | 'EDIT'

export type ModalProps = {
  type: ModalType
  openModal: (e, { type, item, folderId }: openModalProps) => void
  closeModal: (e?: any) => void
  item?: Task | Folder
  folderId?: string
  mode: ModalMode
  onSubmit?: () => void
  onCancel?: () => void
  onError?: () => void
}

export type openModalOptions = {
  type?: ModalType
  item?: Task | Folder
  folderId?: string
  mode?: ModalMode
  defaultModal?: boolean
  content?: React.ReactNode
  onSubmit?: () => void
  onCancel?: () => void
  onError?: () => void
}

export type openModalFC = (
  e?: any,
  { type, item, folderId, onSubmit, onCancel, onError }: openModalOptions,
) => void

export type DeleteItemProps = {
  item: Task | Folder
  type?: ModalType
}

export type NotificationTypes = 'TIME' | 'DATE_TIME'

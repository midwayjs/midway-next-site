export type TOCItem = {
  type: 'DOC' | 'TITLE' | 'LINK'
  title: string
  uuid: string
  url: string
  prev_uuid: string
  sibling_uuid: string
  child_uuid: string
  parent_uuid: string
  doc_id: string
  level: number
  id: string
  open_window: number
  visible: number
  depth: number
  slug: string
}


type GetTOCOption = {
  namespace: string
}

export interface YuqueSDK {
  repos: {
    getTOC (option: GetTOCOption): Promise<TOCItem[]>
  }
}

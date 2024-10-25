import React, { SetStateAction, Dispatch, useContext, useMemo, act } from 'react'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Flex, Typography, Button, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { HolderOutlined, SpotifyOutlined } from '@ant-design/icons'

import { colors } from 'src/styles/colors'

import { CustomButton } from 'src/components'

const { Title } = Typography

interface TrackType {
  id: string
  name: string
  artists: string[]
  album: string
  durationMs: number
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void
  listeners?: SyntheticListenerMap
}

const RowContext = React.createContext<RowContextProps>({})

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext)
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  )
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  }

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  )

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  )
}

type PlaylistModalProps = {
    setSelectedTrackId: Dispatch<SetStateAction<string>>
    selectedTrackId: string
    setNewPlaylists: Dispatch<SetStateAction<any>>
    playlists: any
    pageNumber: number
}

const Playlist: React.FC<PlaylistModalProps> = ({
    setSelectedTrackId,
    selectedTrackId,
    setNewPlaylists,
    playlists,
    pageNumber
}) => {
  const columns: TableColumnsType<TrackType> = [
    { key: 'sort', align: 'center', render: () => <DragHandle />, width: '70px' },
    {
      render: (_: string, record: TrackType) =>
        (
          <Flex 
              vertical
          >
              <Title 
                  ellipsis    
                  style={{ 
                      margin: 0, 
                      fontSize: '14px',
                      color: colors.brand.dark
                  }}
              >
                  {record?.name}
              </Title>
              <Title 
                  ellipsis    
                  style={{ 
                      margin: 0, 
                      fontSize: '12px',
                      color: colors.primaryNeutral[500]
                  }}
              >
                  {record?.artists.join(', ')}
              </Title>
          </Flex>
        ),
      width: '70%'
    },
    {
      render: (_: string, record: TrackType, index: number) =>
        (
          <CustomButton
              style={{ 
                  height: '32px',
                  width: '32px',
                  marginRight: '16px',
                  padding: 0
              }}
              onClick={() => setSelectedTrackId(record?.id)}
              defaultBgColor="transparent"
              defaultColor={colors.brand.dark}
              hoverColor={colors.brand.jamPurple}
          >
              <SpotifyOutlined 
                  style={{ fontSize: '24px', color: record?.id == selectedTrackId ? '#1DB954' : 'inherit'  }}
              />
          </CustomButton>
        ),
      width: '70px'
    }
  ]

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
        setNewPlaylists((prevState) => {
            const newPlaylists = [...prevState]
            const playlistTracks = prevState[pageNumber]?.tracks
            
            let activeIndex = -1
            let overIndex = -1
            for (let i = 0; i < playlistTracks.length; i += 1) {
              if (playlistTracks[i]?.id == active?.id) activeIndex = i
              if (playlistTracks[i]?.id == over?.id) overIndex = i
            }
            const newPlaylistTracks = arrayMove(playlistTracks, activeIndex, overIndex)
            newPlaylists[pageNumber].tracks = newPlaylistTracks
            
            return newPlaylists
        })
    }
  }

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={playlists[pageNumber].tracks.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <Table
              showHeader={false}
              rowKey="id"
              components={{ body: { row: Row } }}
              columns={columns}
              dataSource={playlists[pageNumber].tracks}
              style={{
                  width: '100%',
                  height: '400px',
                  border: `2px solid ${colors.primaryNeutral[200]}`,
                  borderRadius: '8px'
              }}
              pagination={false}
              scroll={{ y: 400, x: 0 }}
          />
      </SortableContext>
    </DndContext>
  )
}

export default Playlist
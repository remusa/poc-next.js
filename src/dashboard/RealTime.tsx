import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import { useChannel } from '../hooks/use-channel'
import Title from './Title'

const topic = `userupdates:lobby`

type TState = {
  id: number
  timestamp: number
  event: string
  reply: string
}

type TUpdate = {
  id: number
  event: string
  name: string
  age: number
}

const crudEvents = ['create', 'update', 'delete']
const ms = 10_000

export default function RealTime() {
  const [state, setState] = React.useState<TState[]>([])
  const [updates, setUpdates] = React.useState<TUpdate[]>([])

  const onChannelMessage = React.useCallback((event: string, payload: any) => {
    if (event === 'phx_reply' && payload.status === 'ok') {
      const res = Object.entries(payload.response)?.at(0)
      if (!res) return
      setState((prev) => {
        const id = prev.length + 1
        const [event, reply] = res
        const newItem = { id, timestamp: Date.now(), event, reply } as TState
        return [...prev, newItem]
      })
    }
    if (crudEvents.includes(event)) {
      setUpdates((prev) => {
        const id = prev.length + 1
        const newItem = { id, event, ...payload } as TUpdate
        return [...prev, newItem]
      })
    }
  }, [])

  const broadcast = useChannel(topic, onChannelMessage)

  const send = React.useCallback(
    (event: string, payload: any) => {
      broadcast(event, payload)
    },
    [broadcast],
  )

  React.useEffect(() => {
    const timer = setInterval(() => {
      send('ping', { ping: 'pong' })
    }, ms)
    return () => clearInterval(timer)
  }, [send])

  return (
    <React.Fragment>
      <Title>Real Time User Updates</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="user updates table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {updates.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.event}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Title>Real Time Ping Pong ({ms / 1000}s. interval)</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, maxHeight: 250 }} size="small" aria-label="events table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Reply</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.event}</TableCell>
                <TableCell>{row.reply}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

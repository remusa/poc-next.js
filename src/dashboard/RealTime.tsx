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

if (typeof window !== 'undefined') {
  // TODO: save current user to window object to authenticate
  window.currentUser = {
    email: 'test@zubale.com',
    id: 'test',
  }
}

const topic = `userupdates:lobby`

type TUpdate = {
  id: number
  event: string
  name: string
  age: number
}

const crudEvents = ['create', 'update', 'delete']

export default function RealTime() {
  const [state, setState] = React.useState<TUpdate[]>([])

  const onChannelMessage = React.useCallback((event: string, payload: any) => {
    if (crudEvents.includes(event)) {
      setState((prev) => {
        const id = prev.length + 1
        const newItem = { id, event, ...payload } as TUpdate
        return [...prev, newItem]
      })
    }
  }, [])

  const broadcast = useChannel(topic, onChannelMessage)

  const onSend = React.useCallback(() => {
    broadcast(topic, { payload: 'message' })
  }, [broadcast])

  React.useEffect(() => {
    onSend()
  }, [broadcast, onSend])

  return (
    <React.Fragment>
      <Title>Real Time User Updated</Title>
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
            {state.map((row) => (
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
    </React.Fragment>
  )
}

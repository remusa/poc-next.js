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

type TTask = {
  brand: string
  country: string
  retailer: string
  review: boolean
  score: number
  soft_reject: string
  status: string
  task_id: string
  user_phone: string
}

const crudEvents = ['create', 'update', 'delete']

export default function RealTime() {
  const ms = 10_000
  const [state, setState] = React.useState<TState[]>([])
  const [updates, setUpdates] = React.useState<TUpdate[]>([])
  const [tasks, setTasks] = React.useState<TTask[]>([])

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

  const broadcast = useChannel('userupdates:lobby', onChannelMessage)

  const onChannelMessageSubmission = React.useCallback((event: string, payload: any) => {
    if (event === 'phx_reply' && payload.status === 'ok') {
      setTasks(payload.response)
    }
    if (crudEvents.includes(event)) {
      console.log(`🚀 ~ onChannelMessageSubmission ~ payload`, payload)
    }
  }, [])

  const broadcastSub = useChannel('submissions:lobby', onChannelMessageSubmission)

  const send = React.useCallback((event: string, payload: any, callback) => {
    callback(event, payload)
  }, [])

  React.useEffect(() => {
    const timer = setInterval(() => {
      send('ping', { ping: 'pong' }, broadcast)
    }, ms)
    return () => clearInterval(timer)
  }, [broadcast, send])

  return (
    <React.Fragment>
      <Title>Real Time Submissions</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="submissions table">
          <TableHead>
            submissions
            <TableRow>
              <TableCell>Task ID</TableCell>
              <TableCell>User Phone</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Retailer</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Soft-Rejected?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <TableRow key={row.task_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.task_id}
                </TableCell>
                <TableCell>{row.user_phone}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>{row.brand}</TableCell>
                <TableCell>{row.retailer}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.soft_reject}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
                <TableCell>{row.age}tasks</TableCell>
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

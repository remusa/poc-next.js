import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import Title from './Title'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export type Submission = {
  id: number
  brand: string
  retailer: string
  country: string
  store: string
  submission: {
    id: number
    additionalData: string
  }
  taskId: string
  type: string
  phoneNumber: string
  userUuid: string
  score: number
  reviewed: boolean
  status: string
  value: string
  approved: boolean
  comments: number
  imageCount: number
  version: number
  formType: string
  softReject: number
  createdOn: string
  modifiedOn: string
}

export default function Submissions(props) {
  const [reviews, setReviews] = React.useState<Submission[]>([])

  const handleGetSubmissions = () => {
    // Client-side request are mocked by `mocks/browser.js`.
    fetch('/submissions')
      .then((res) => res.json())
      .then(setReviews)
      .catch((e) => console.log(e))
  }

  React.useEffect(() => {
    handleGetSubmissions()
  }, [])

  const rows = reviews

  return (
    <React.Fragment>
      <Title>Submissions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User Phone</TableCell>
            <TableCell>Task ID</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Retailer</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Date Added</TableCell>
            <TableCell>Soft-Rejected?</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.taskId}</TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.retailer}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.createdOn}</TableCell>
              <TableCell>{row.softReject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more submissions
      </Link>
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  // Server-side requests are mocked by `mocks/server.js`.
  const res = await fetch('/submissions')
  const submissions = await res.json()

  return {
    props: {
      submissions,
    },
  }
}

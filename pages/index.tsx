import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'

import Copyright from '../src/Copyright'
import Link from '../src/Link'
import ProTip from '../src/ProTip'

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          About
        </Link>
        <Link href="/dashboard" color="secondary">
          Dashboard
        </Link>
        <Link href="/sign-up" color="secondary">
          Sign Up
        </Link>
        <Link href="/sign-in" color="secondary">
          Sign In
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

export default Home

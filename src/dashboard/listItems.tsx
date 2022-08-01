import AssignmentIcon from '@mui/icons-material/Assignment'
import BarChartIcon from '@mui/icons-material/BarChart'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

type Props = {
  path: string
  text: string
  icon?: React.ReactElement | null
}

function MenuLink({ path, text, icon = null }: Props) {
  const router = useRouter()
  return (
    <Link href={path}>
      <ListItemButton selected={router.pathname === path}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Link>
  )
}

export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Home
    </ListSubheader>
    <MenuLink path="/" text="Home" icon={<HomeIcon />} />

    <Divider />

    <ListSubheader component="div" inset>
      Dashboard
    </ListSubheader>
    <MenuLink path="/dashboard" text="Dashboard" icon={<DashboardIcon />} />

    <Divider />

    <ListSubheader component="div" inset>
      Submissions
    </ListSubheader>
    <MenuLink path="/submissions" text="Submissions" icon={<ShoppingCartIcon />} />

    <Divider />

    <ListSubheader component="div" inset>
      Reviewed
    </ListSubheader>
    <MenuLink path="/reviews" text="My Reviews" icon={<AssignmentIcon />} />
    <MenuLink path="/results" text="Results" icon={<BarChartIcon />} />
  </React.Fragment>
)

export const secondaryListItems = <React.Fragment></React.Fragment>

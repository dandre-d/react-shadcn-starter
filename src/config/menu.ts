import { Icons } from "@/components/icons"

interface NavItem {
    title: string
    to?: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
}

interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export const mainMenu: NavItemWithChildren[] = [
    {
        title: 'Dashboard',
        to: '',
    },
    {
        title: 'Add Orders',
        to: 'Orders',
    },
    {
        title: 'Order Calendar',
        to: 'OrderCalendar',
    },
    {
        title: 'Manage',
        to: 'Manage',
    },
    {
        title: 'Users',
        to: 'Users',
    },
    {
        title: 'Admin Manage',
        items: [
   
            {
                title: 'Users',
                to: 'Users',
            },
            {
                title: 'Manage',
                to: 'Manage',
            },
        ]
    },
  
    {
        title: 'User',
        items: [
            {
                title: 'Orders',
                to: 'Orders',
            },
            {
                title: 'Edit',
                to: 'Menu',
            },
            {
                title: 'Items',
                to: 'Manage',
            },
        ]
    },

]

export const sideMenu: NavItemWithChildren[] = []

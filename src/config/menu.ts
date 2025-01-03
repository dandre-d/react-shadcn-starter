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
        title: 'Admin Manage',
        items: [
            {
                title: 'Office',
                to: 'Actions',
            },
            {
                title: 'Vendor',
                to: 'Manage/Vendor',
            },
            {
                title: 'User',
                to: 'Manage/Users',
            },
        ]
    },
    {
        title: 'Admin Menu',
        items: [
            {
                title: 'Upload',
                to: 'Menu',
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

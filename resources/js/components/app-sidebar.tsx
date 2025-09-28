import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { CalendarDays,BookOpen, Brain, FileText, Folder, LayoutGrid, LayoutPanelTop, MessagesSquare, Newspaper, Scale, UserPen } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Layanan',
        href: '/layanan',
        icon: MessagesSquare,
    },
    {
        title: 'Agenda',
        href: '/agenda',
        icon: CalendarDays,
    },
    {
        title: 'Profil',
        href: '/profil',
        icon: UserPen,
    },
    {
        title: 'Berita',
        href: '/berita',
        icon: Newspaper,
    },
    {
        title: 'Laporan Kegiatan',
        href: '/laporan-kegiatan',
        icon: BookOpen,
    },
    {
        title: 'PPID',
        href: '/ppid',
        icon: FileText,
    },
    {
        title: 'Inovasi',
        href: '/inovasi',
        icon: Brain,
    },
    {
        title: 'Produk Hukum',
        href: '/produk-hukum',
        icon: Scale,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

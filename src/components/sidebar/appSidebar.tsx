"use client"

import Image from "next/image"
import Link from "next/link"

import { Send, FileText, LifeBuoy, FolderPlus, MonitorPlay } from "lucide-react"
import { NavSecondary } from "./navSecondary"
import { NavMain } from "./navMain"
import { NavUser } from "./navUser"
import {
	Sidebar,
	SidebarMenu,
	SidebarFooter,
	SidebarHeader,
	SidebarContent,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
	navMain: [
		{
			name: "Permiso de Trabajo",
			url: "/dashboard/permiso-trabajo",
			icon: FileText,
		},
		{
			name: "Video de Seguridad",
			url: "/dashboard/video-seguridad",
			icon: MonitorPlay,
		},
		{
			name: "Registro de Actividades",
			url: "/dashboard/registro-actividades",
			icon: FolderPlus,
		},
	],
	navSecondary: [
		{
			title: "Soporte",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Contacto",
			url: "#",
			icon: Send,
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Image src="/logo.jpeg" width={50} height={50} alt="Logo" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">OTC</span>
									<span className="truncate text-xs">Ordenes de trabajo</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain navItems={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}

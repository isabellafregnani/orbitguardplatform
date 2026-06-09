import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardNavbar } from '@/components/dashboard/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      <DashboardSidebar />
      <div className="w-full min-w-0 transition-all duration-300 lg:pl-64">
        <DashboardNavbar />
        <main className="w-full min-w-0 max-w-full overflow-x-hidden p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

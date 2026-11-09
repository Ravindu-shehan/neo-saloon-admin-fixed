import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout(props :any){
    return(
        <SidebarProvider>
                <AppSidebar />
                <main>
                  <SidebarTrigger />
                  {props.children}
                </main>
              </SidebarProvider> 
    )
}
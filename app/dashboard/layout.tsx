export default function DashboardLayout(props :any){
    return(
        <div className="w-full h-screen bg-red-900 flex">
            <div className="w-[300px] h-screen bg-blue-600">
            
            </div>
            <div className="flex-1 h-screen bg-green-600">
                {props.children}
            </div>
        </div>
    )
}
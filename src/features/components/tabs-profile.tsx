import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableProfileTopup } from "../pages/profile/topup/table-profile-topup";



export function TabsProfile(){
    return (
        <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 gap-3">
              <TabsTrigger value="transactions">Top Up</TabsTrigger>
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="history">Membership</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="space-y-4">
              <TableProfileTopup />
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
             <Table>

             </Table>
            </TabsContent>
          </Tabs>
    )
}
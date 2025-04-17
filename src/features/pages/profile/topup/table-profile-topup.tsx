import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { FormatCurrency } from "@/utils/formatPrice"

export function TableProfileTopup() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Metode</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Referensi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>12/03/2024 14:30</TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell>{FormatCurrency(50000)}</TableCell>
            <TableCell>
              <Badge variant="default">Berhasil</Badge>
            </TableCell>
            <TableCell>TOP-123456</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>10/03/2024 09:15</TableCell>
            <TableCell>E-Wallet</TableCell>
            <TableCell>{FormatCurrency(100000)}</TableCell>
            <TableCell>
              <Badge variant="default">Berhasil</Badge>
            </TableCell>
            <TableCell>TOP-123455</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>08/03/2024 16:45</TableCell>
            <TableCell>QRIS</TableCell>
            <TableCell>{FormatCurrency(75000)}</TableCell>
            <TableCell>
              <Badge variant="destructive">Gagal</Badge>
            </TableCell>
            <TableCell>TOP-123454</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

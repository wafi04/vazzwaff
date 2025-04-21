import { TableCell, TableRow } from "@/components/ui/table"
import { CategoriesData } from "@/schemas/category"

interface CategoryDetailsProps {
    category: CategoriesData
}

export function CategoryDetails({ category }: CategoryDetailsProps) {
  return (
    <TableRow className="bg-muted/10">
      <TableCell colSpan={8} className="p-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoSection
              title="Informasi Dasar"
              items={[
                { label: "Nama", value: category.name },
                { label: "Sub Nama", value: category.subName },
                { label: "Kode", value: category.code, isCode: true },
                { label: "Brand", value: category.brand },
              ]}
            />
            <InfoSection
              title="Detail Tambahan"
              items={[
                { label: "Tipe", value: category.type },
                { label: "Status", value: category.status },
                { label: "Server ID", value: String(category.serverId) },
                {
                  label: "Dibuat",
                  value: new Date(category.createdAt).toLocaleDateString(),
                },
              ]}
            />
          </div>

          {category.description && <TextSection title="Deskripsi" content={category.description} />}

          {category.instructions && <TextSection title="Instruksi" content={category.instructions} />}
        </div>
      </TableCell>
    </TableRow>
  )
}

interface InfoSectionProps {
  title: string
  items: Array<{
    label: string
    value: string
    isCode?: boolean
  }>
}

function InfoSection({ title, items }: InfoSectionProps) {
  return (
    <div>
      <h4 className="font-medium text-sm text-muted-foreground mb-2">{title}</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[120px_1fr] gap-1">
            <span className="text-xs text-muted-foreground">{item.label}:</span>
            <span className={`text-sm ${item.isCode ? "font-mono" : ""}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface TextSectionProps {
  title: string
  content: string
}

function TextSection({ title, content }: TextSectionProps) {
  return (
    <div>
      <h4 className="font-medium text-sm text-muted-foreground mb-2">{title}</h4>
      <p className="text-sm">{content}</p>
    </div>
  )
}

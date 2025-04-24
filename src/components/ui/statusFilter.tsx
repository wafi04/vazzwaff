import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}
export const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => (
  <Select onValueChange={onChange} value={value} defaultValue="active">
    <SelectTrigger className="min-w-[180px]">
      <SelectValue placeholder="Filter by status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="inactive">Inactive</SelectItem>
      <SelectItem value="all">All</SelectItem>
    </SelectContent>
  </Select>
);
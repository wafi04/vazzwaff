import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddToCart } from "@/hooks/use-order";

interface ServerOption {
  name: string;
  value: string;
}

type ServerData = string[] | ServerOption[];

interface PlaceholderInputProps {
  placeholder1: string;
  placeholder2?: string;
  serverData?: ServerData;
  onChange?: (userId?: string, serverId?: string) => void;
}

export function PlaceholderInput({
  placeholder1,
  placeholder2,
  serverData = [],
  onChange,
}: PlaceholderInputProps) {
 const {gameId,gameServer,setGameId,setGameServer}  = useAddToCart()
  const hasSecondInput =
    placeholder2 &&
    placeholder2 !== "-" &&
    placeholder2 !== "." &&
    placeholder2 !== "2" &&
    placeholder2 !== "h";

  const shouldUseDropdown = hasSecondInput && serverData.length > 0;

  const formattedServerData: ServerOption[] = serverData.map((item) =>
    typeof item === "string" ? { name: item, value: item } : item
  );

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserId = e.target.value;
    setGameId(newUserId);
    onChange?.(newUserId, gameId);
  };

 const handleServerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newServerId = e.target.value;
  setGameServer(newServerId); 
  onChange?.(gameId, newServerId);
};

  const handleServerDropdownChange = (value: string) => {
    setGameServer(value);
    onChange?.(gameServer, value);
  };

  useEffect(() => {
    onChange?.(gameId, gameServer);
  }, []);

  return (
   <div className="">
  <div className={`grid gap-4 ${hasSecondInput ? "md:grid-cols-2" : "grid-cols-1"}`}>
    {/* First Input */}
    <div className="w-full">
      <label className="block text-sm font-medium text-white/80 mb-1">
        {placeholder1}
      </label>
      <Input
        type="text"
        className="w-full px-4 py-2 border border-[#4f9cf9]/30 rounded-md bg-[#001435] text-white placeholder-white/50 focus:ring-[#4f9cf9] focus:border-[#4f9cf9]"
        placeholder={`Enter ${placeholder1}`}
        value={gameId}
        onChange={handleUserIdChange}
      />
    </div>
    {hasSecondInput && (
      <div className="w-full">
        <label className="block text-sm font-medium text-white/80 mb-1">
          {placeholder2}
        </label>
        {shouldUseDropdown ? (
          <Select value={gameServer} onValueChange={handleServerDropdownChange}>
            <SelectTrigger className="w-full px-4 py-2 border border-[#4f9cf9]/30 rounded-md bg-[#001435] text-white h-10">
              <SelectValue placeholder={`Select ${placeholder2}`} />
            </SelectTrigger>
            <SelectContent className="bg-[#001f54] border border-[#4f9cf9]/30 text-white">
              {formattedServerData.map((server) => (
                <SelectItem
                  key={server.value}
                  value={server.value}
                  className="hover:bg-[#4f9cf9]/20"
                >
                  {server.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type="text"
            className="w-full px-4 py-2 border border-[#4f9cf9]/30 rounded-md bg-[#001435] text-white placeholder-white/50 focus:ring-[#4f9cf9] focus:border-[#4f9cf9]"
            placeholder={`Enter ${placeholder2}`}
            value={gameServer}
            onChange={handleServerIdChange}
          />
        )}
      </div>
    )}
  </div>
</div>
  );
}

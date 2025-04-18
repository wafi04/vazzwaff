"use client"

import { SettingsLayout } from "@/components/layouts/settings-layout";
import { GetAllSession } from "../api/sesssion";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Clock, Globe, Monitor, Shield, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale"; 
import { useState } from "react";
import DialogRevokeSession from "../_components/dialogRevokeSessions";
import { parseUserAgent } from "@/utils/helpers";

export default function SessionsPage() {
  const { data, isLoading } = GetAllSession();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRevokeAllDialogOpen, setIsRevokeAllDialogOpen] = useState(false);
  
  if (isLoading) {
    return <LoadingOverlay />;
  }
  
  const handleOpenSessionDialog = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsDialogOpen(true);
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const text = formatDistanceToNow(date, { 
        addSuffix: true,
        locale: id
      });
      return text.replace("sekitar", "");
    } catch (e) {
      return "Waktu tidak diketahui";
    }
  };
  
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Aktivitas Sesi</h1>
<p className="text-sm text-blue-300">Kelola akses dari perangkat lain dengan aman.</p>

        </div>
        <div className="space-y-6">
          <div className="rounded-lg border border-blue-900 bg-[#00184a] p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-white">Sesi Anda</h2>
                <p className="text-sm text-blue-200 mt-1">Lihat dan kelola semua sesi aktif Anda.</p>
              </div>
              <button
                onClick={() => setIsRevokeAllDialogOpen(true)}
                className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-800 hover:to-red-800 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-all flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Revoke All Sessions
              </button>   

            </div>
            <div className="space-y-4">
              {data && data.length > 0 ? (
                data.map((session) => {
                  const userAgentInfo = parseUserAgent(session.userAgent);
                  return (
                    <div key={session.id} className="rounded-xl border border-blue-700 bg-[#031a3a] hover:bg-[#05214a] transition-all duration-200 p-5 shadow-sm group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-5 w-5 text-blue-400 group-hover:text-white transition" />
                          <span className="font-semibold text-white tracking-tight">
                            {userAgentInfo.browser} <span className="text-blue-300">•</span> {userAgentInfo.os}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-blue-300">
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            <span>{session.ipAdress || 'IP Tidak Diketahui'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(session.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenSessionDialog(session.id)}
                        className="bg-red-700 hover:bg-red-800 text-red-100 px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border border-red-900 shadow-inner"
                      >
                        <Trash2 className="h-4 w-4" />
                        Revoke
                      </button>
                    </div>
                  </div>
                  
                )})
              ) : (
                <div className="rounded-xl border border-blue-800 bg-[#02122c] p-6 text-center text-blue-300 text-sm italic">
                🚫 Tidak ada sesi aktif ditemukan.
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {selectedSessionId && (
        <DialogRevokeSession
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          sessionId={selectedSessionId}
          message="Apakah Anda yakin ingin mencabut sesi ini?"
          title="Cabut Sesi"
        />
      )}
      
      <DialogRevokeSession
        open={isRevokeAllDialogOpen}
        onOpenChange={setIsRevokeAllDialogOpen}
        message="Apakah Anda yakin ingin mencabut semua sesi? Ini akan mengeluarkan Anda dari semua perangkat kecuali yang ini."
        title="Cabut Semua Sesi"
      />
    </SettingsLayout>
  );
}

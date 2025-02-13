"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Group {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

export default function GroupPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGroups() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("groups")
        .select("id, name, owner_id, created_at")
        .eq("owner_id", user.id);

      if (error) {
        console.error("Erro ao carregar grupos:", error.message);
      } else {
        setGroups(data || []);
      }
    }

    fetchGroups();
  }, []);

  async function handleDeleteGroup(groupId: string) {
    const supabase = createClient();
    setLoading(true);

    const { error } = await supabase.from("groups").delete().eq("id", groupId);

    if (error) {
      console.error("Erro ao excluir grupo:", error.message);
    } else {
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
    }

    setLoading(false);
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 mt-4">Meus grupos</h1>

      <Separator className="my-4" />

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.length > 0 ? (
            groups.map((group) => (
              <Card key={group.id} className="relative overflow-hidden">
                <Link href={`/private/grupos/${group.id}`} className="cursor-pointer">
                  <CardHeader className="pb-4">
                    <CardTitle>{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(group.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Link>

                {/* Botão de excluir */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleDeleteGroup(group.id)}
                  disabled={loading}
                >
                  <Trash2 className="w-8 h-8 text-red-600" />
                </Button>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground">Nenhum grupo encontrado.</p>
          )}
        </div>
      </ScrollArea>
    </main>
  );
}
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data: authUser } = await supabase.auth.getUser();

  if (authUser?.user) {
    // Se o usuário estiver autenticado, redireciona para criar um novo grupo
    redirect("/private/grupos/novo");
  } else {
    // Se não estiver autenticado, redireciona para o login
    redirect("/login");
  }

  return null;    
}

import { Gift, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return(
    <header className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/"
            className="text-2xl font-bold flex items-center gap-2"
          >
            <Gift className="h-6 w-6 text-red-400"/>
            <span>
              Amigo
              <span className="font-thin">Secreto</span>
            </span>
          </Link>
          <nav className="flex items-cennter space-x-4">
            <Link 
              href="/private/grupos"
              className="text-foreground text-sm flex gap-2 items-center"
            >
              <UserRound className="h-4 w-4" />
               Meus grupos
            </Link>

            <Button asChild variant="outline">
              <Link href="/private/grupos/novo">
                Novo grupo
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
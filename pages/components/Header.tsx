"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Flex } from "@chakra-ui/react";

const gnav = [
  { id: 1, name: "TOP", href: "/" },
  { id: 2, name: "GOODS", href: "/goods" },
  { id: 3, name: "TODO", href: "/todo" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <>
      <nav>
        <Flex gap="4" p="4">
          {gnav.map(({ href, name, id }) => (
            <div key={id}>
              <Link href={href} className={pathname === href ? "current" : ""}>
                {name}
              </Link>
            </div>
          ))}
        </Flex>
      </nav>
    </>
  );
}

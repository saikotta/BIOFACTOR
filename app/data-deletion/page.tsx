import { redirect } from "next/navigation";

export default function DataDeletionRedirect() {
  redirect("/privacy-policy#data-deletion");
}

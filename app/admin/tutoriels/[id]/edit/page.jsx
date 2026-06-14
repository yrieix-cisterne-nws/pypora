import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TutorielForm from "@/components/admin/TutorielForm";

export default async function EditTutoriel({ params }) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (isNaN(numId)) notFound();

  const tutoriel = await prisma.tutoriel.findUnique({ where: { id: numId } });
  if (!tutoriel) notFound();

  return <TutorielForm initialData={tutoriel} />;
}

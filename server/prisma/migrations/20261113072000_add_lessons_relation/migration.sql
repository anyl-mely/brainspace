-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Fullstack Core',
    "duration" TEXT NOT NULL DEFAULT '15 phút',
    "order" INTEGER NOT NULL DEFAULT 1,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "objectives" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lessons_order_idx" ON "lessons"("order");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

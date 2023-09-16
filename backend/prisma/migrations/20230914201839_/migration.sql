-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

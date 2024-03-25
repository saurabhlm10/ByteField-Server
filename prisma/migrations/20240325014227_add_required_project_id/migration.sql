/*
  Warnings:

  - You are about to drop the column `fileFolderId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rootFolderId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `FileFolder` table without a default value. This is not possible if the table is not empty.

*/
-- Delete all existing rows to prevent issues with non-nullable projectId column
DELETE FROM "FileFolder";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_fileFolderId_fkey";

-- DropIndex
DROP INDEX "Project_fileFolderId_key";

-- AlterTable
ALTER TABLE "FileFolder" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "fileFolderId",
ADD COLUMN     "rootFolderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Project_rootFolderId_key" ON "Project"("rootFolderId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_rootFolderId_fkey" FOREIGN KEY ("rootFolderId") REFERENCES "FileFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFolder" ADD CONSTRAINT "FileFolder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

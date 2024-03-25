/*
  Warnings:

  - Made the column `rootFolderId` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_rootFolderId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "rootFolderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_rootFolderId_fkey" FOREIGN KEY ("rootFolderId") REFERENCES "FileFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

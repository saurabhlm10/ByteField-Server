-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_rootFolderId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "rootFolderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_rootFolderId_fkey" FOREIGN KEY ("rootFolderId") REFERENCES "FileFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

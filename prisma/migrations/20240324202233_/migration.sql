-- CreateTable
CREATE TABLE "Snippet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fileFolderId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileFolder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isFolder" BOOLEAN NOT NULL,
    "content" TEXT,
    "parent_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileFolder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_fileFolderId_key" ON "Project"("fileFolderId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_fileFolderId_fkey" FOREIGN KEY ("fileFolderId") REFERENCES "FileFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFolder" ADD CONSTRAINT "FileFolder_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "FileFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

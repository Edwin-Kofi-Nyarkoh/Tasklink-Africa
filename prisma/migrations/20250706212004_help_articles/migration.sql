-- CreateEnum
CREATE TYPE "ArticlePurposes" AS ENUM ('STARTERS', 'CUSTOMERS', 'PROFESSIONALS', 'PAYMENTS');

-- CreateTable
CREATE TABLE "HelpArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "purpose" "ArticlePurposes" NOT NULL DEFAULT 'STARTERS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HelpArticle_pkey" PRIMARY KEY ("id")
);

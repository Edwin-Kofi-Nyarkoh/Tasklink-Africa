/*
  Warnings:

  - Added the required column `popular` to the `HelpArticle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HelpArticle" ADD COLUMN     "popular" BOOLEAN NOT NULL;

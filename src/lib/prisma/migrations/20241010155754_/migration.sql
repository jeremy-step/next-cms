-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "Robots" AS ENUM ('IndexFollow', 'NoIndexNoFollow', 'IndexNoFollow', 'NoIndexFollow');

-- CreateEnum
CREATE TYPE "SitemapInclude" AS ENUM ('Yes', 'No');

-- CreateEnum
CREATE TYPE "SitemapPrio" AS ENUM ('P100', 'P90', 'P80', 'P70', 'P60', 'P50', 'P40', 'P30', 'P20', 'P10', 'P0');

-- CreateEnum
CREATE TYPE "SitemapChangeFreq" AS ENUM ('Always', 'Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly', 'Never');

-- CreateTable
CREATE TABLE "Page" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageMetaData" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "permalink" TEXT NOT NULL,
    "robots" "Robots" NOT NULL DEFAULT 'IndexFollow',
    "sitemapInclude" "SitemapInclude" NOT NULL DEFAULT 'Yes',
    "sitemapPrio" "SitemapPrio" NOT NULL DEFAULT 'P70',
    "sitemapChangeFreq" "SitemapChangeFreq" NOT NULL DEFAULT 'Monthly',
    "pageId" UUID NOT NULL,

    CONSTRAINT "PageMetaData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageMetaData_permalink_key" ON "PageMetaData"("permalink");

-- CreateIndex
CREATE UNIQUE INDEX "PageMetaData_pageId_key" ON "PageMetaData"("pageId");

-- AddForeignKey
ALTER TABLE "PageMetaData" ADD CONSTRAINT "PageMetaData_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

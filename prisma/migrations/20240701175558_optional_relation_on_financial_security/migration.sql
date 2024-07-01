-- DropForeignKey
ALTER TABLE "financial_securities" DROP CONSTRAINT "financial_securities_purchase_id_fkey";

-- AlterTable
ALTER TABLE "financial_securities" ADD COLUMN     "sale_id" TEXT,
ALTER COLUMN "purchase_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "financial_securities" ADD CONSTRAINT "financial_securities_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_securities" ADD CONSTRAINT "financial_securities_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

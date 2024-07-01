-- CreateTable
CREATE TABLE "account_receivable_movements" (
    "id" TEXT NOT NULL,
    "financial_security_id" TEXT NOT NULL,
    "movement_date" TIMESTAMP(3) NOT NULL,
    "movement_type" INTEGER NOT NULL,
    "movement_value" INTEGER NOT NULL,
    "interest_value" INTEGER,
    "fine_value" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_receivable_movements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "account_receivable_movements" ADD CONSTRAINT "account_receivable_movements_financial_security_id_fkey" FOREIGN KEY ("financial_security_id") REFERENCES "financial_securities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

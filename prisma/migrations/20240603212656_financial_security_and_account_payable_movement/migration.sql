-- CreateTable
CREATE TABLE "financial_securities" (
    "id" TEXT NOT NULL,
    "purchase_id" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "quota" INTEGER NOT NULL,
    "original_value" INTEGER NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "situation" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_securities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_payable_movements" (
    "id" TEXT NOT NULL,
    "financial_security_id" TEXT NOT NULL,
    "movement_date" TIMESTAMP(3) NOT NULL,
    "movement_type" INTEGER NOT NULL,
    "movement_value" INTEGER NOT NULL,
    "interest_value" INTEGER,
    "fine_value" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_payable_movements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "financial_securities" ADD CONSTRAINT "financial_securities_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_payable_movements" ADD CONSTRAINT "account_payable_movements_financial_security_id_fkey" FOREIGN KEY ("financial_security_id") REFERENCES "financial_securities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

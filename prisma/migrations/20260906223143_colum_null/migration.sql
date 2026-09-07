-- AlterTable
ALTER TABLE "layer"."authors" ALTER COLUMN "created_by" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "layer"."posts" ALTER COLUMN "created_by" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_by" DROP NOT NULL;

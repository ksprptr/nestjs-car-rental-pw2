/*
  Warnings:

  - You are about to drop the column `attributesId` on the `vehicles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleId]` on the table `vehicle_attributes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleId` to the `vehicle_attributes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_attributesId_fkey";

-- DropIndex
DROP INDEX "vehicles_attributesId_key";

-- AlterTable
ALTER TABLE "vehicle_attributes" ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "attributesId";

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_attributes_vehicleId_key" ON "vehicle_attributes"("vehicleId");

-- AddForeignKey
ALTER TABLE "vehicle_attributes" ADD CONSTRAINT "vehicle_attributes_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

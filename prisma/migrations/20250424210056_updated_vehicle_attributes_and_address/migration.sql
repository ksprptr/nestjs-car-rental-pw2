/*
  Warnings:

  - You are about to drop the column `consumption` on the `VehicleAttributes` table. All the data in the column will be lost.
  - You are about to drop the column `speedMph` on the `VehicleAttributes` table. All the data in the column will be lost.
  - Added the required column `fuelConsumption` to the `VehicleAttributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mileage` to the `VehicleAttributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topSpeedMph` to the `VehicleAttributes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "addressId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VehicleAttributes" DROP COLUMN "consumption",
DROP COLUMN "speedMph",
ADD COLUMN     "fuelConsumption" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mileage" INTEGER NOT NULL,
ADD COLUMN     "topSpeedMph" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

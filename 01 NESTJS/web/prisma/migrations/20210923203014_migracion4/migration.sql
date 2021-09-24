/*
  Warnings:

  - You are about to drop the column `usuario` on the `Pelicula` table. All the data in the column will be lost.
  - Added the required column `director` to the `Pelicula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pelicula` DROP COLUMN `usuario`,
    ADD COLUMN `director` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Page` ADD COLUMN `imagePath` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `TeamMember` ADD COLUMN `teaser` TEXT NULL,
    ADD COLUMN `branch` VARCHAR(191) NULL,
    ADD COLUMN `group` ENUM('MANAGING_PARTNERS_CEO', 'PARTNERS_DIRECTORS', 'SENIOR_WHOLE_TIME_CONSULTANTS', 'WHOLE_TIME_CONSULTANTS', 'EMPANELLED_ADVOCATES') NOT NULL DEFAULT 'WHOLE_TIME_CONSULTANTS',
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `TeamMember_group_sortOrder_idx` ON `TeamMember`(`group`, `sortOrder`);

-- AlterTable
ALTER TABLE `ContactLead` ADD COLUMN `handled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `handledAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `ContactLead_handled_createdAt_idx` ON `ContactLead`(`handled`, `createdAt`);

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `featuredImagePath` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Newsletter` ADD COLUMN `slug` VARCHAR(191) NULL,
    ADD COLUMN `teaser` TEXT NULL,
    ADD COLUMN `issueNumber` VARCHAR(191) NULL,
    ADD COLUMN `issueDate` DATETIME(3) NULL,
    ADD COLUMN `pdfPath` VARCHAR(191) NULL,
    ADD COLUMN `coverImagePath` VARCHAR(191) NULL,
    ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false;

-- Backfill slug for any existing newsletter rows before enforcing NOT NULL + unique
UPDATE `Newsletter` SET `slug` = CONCAT('newsletter-', `id`) WHERE `slug` IS NULL;

-- AlterTable
ALTER TABLE `Newsletter` MODIFY `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Newsletter_slug_key` ON `Newsletter`(`slug`);

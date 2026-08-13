-- Add editorial fields to ServiceCategory so cards on /services and
-- the "More Services" listing can be edited directly from the admin
-- without depending on a separate CMS Page record.

ALTER TABLE `ServiceCategory`
  ADD COLUMN `teaser` TEXT NULL,
  ADD COLUMN `description` TEXT NULL,
  ADD COLUMN `imagePath` VARCHAR(191) NULL;

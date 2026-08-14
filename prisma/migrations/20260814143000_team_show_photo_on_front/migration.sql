-- Admin can keep a team portrait on file while hiding it on the public site.
ALTER TABLE `TeamMember`
  ADD COLUMN `showPhotoOnFront` BOOLEAN NOT NULL DEFAULT true;

/**
 * Headshots copied from https://www.dsblawgroup.com/our-team into /public/team.
 * These files live outside public/uploads so rsync/Docker actually deploy them.
 *
 * Pooja Jindal only has a generic silhouette on the old site — initials until a real photo is uploaded.
 */
export type TeamPhotoSource = {
  id: string;
  names: string[];
  url: string;
  file: string;
};

export const TEAM_PHOTO_SOURCES: TeamPhotoSource[] = [
  {
    id: 'seed-dinesh-gupta',
    names: ['Dinesh Gupta'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/05/dinesh-gupta2.jpg',
    file: 'dinesh-gupta.jpg',
  },
  {
    id: 'seed-deepali-gupta',
    names: ['Deepali Gupta'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/03/deepali-mam-e1777285026351.png',
    file: 'deepali-gupta.png',
  },
  {
    id: 'seed-kanika-gupta',
    names: ['Kanika Gupta'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/05/kanika-gupta2-e1777285128839.jpg',
    file: 'kanika-gupta.jpg',
  },
  {
    id: 'seed-nitin-jain',
    names: ['Nitin Jain'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/04/nitin-jain.jpg',
    file: 'nitin-jain.jpg',
  },
  {
    id: 'seed-saurabh-gupta',
    names: ['Saurabh Kumar Gupta', 'Saurabh Gupta', 'Sourabh Gupta'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/03/sourabh-e1777285207397.png',
    file: 'saurabh-gupta.png',
  },
  {
    id: 'seed-shifali-singla',
    names: ['Shifali Singla'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/03/ritika-seth-e1777285285786.jpg',
    file: 'shifali-singla.jpg',
  },
  {
    id: 'seed-nikita-arora',
    names: ['Nikita Arora'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/03/nikita-2-e1777285174281.jpg',
    file: 'nikita-arora.jpg',
  },
  {
    id: 'seed-aditi-kapur',
    names: ['Aditi Kapur', 'Aditi Kapur Arora'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/03/aditi-e1777285524444.png',
    file: 'aditi-kapur.png',
  },
  {
    id: 'seed-jorawar-bhasin',
    names: ['Jorawar Singh Bhasin', 'Jorawar Bhasin', 'JS Bhasin'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/04/JS-bhasin-e1777285246665.jpg',
    file: 'jorawar-singh-bhasin.jpg',
  },
  {
    id: 'seed-yogesh-bochiwal',
    names: ['Yogesh Bochiwal', 'Mr. Yogesh Bochiwal'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/03/Yogesh-Bochiwal-e1777285579613.jpg',
    file: 'yogesh-bochiwal.jpg',
  },
  {
    id: 'seed-sagrika-jayee',
    names: ['Sagrika Jayee'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/03/sagrika-1-e1777285741932.jpg',
    file: 'sagrika-jayee.jpg',
  },
  {
    id: 'seed-meenakshi-seth',
    names: ['Meenakshi Seth'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/04/meenakshi-seth-e1777285812237.jpg',
    file: 'meenakshi-seth.jpg',
  },
  {
    id: 'seed-wishey-kataria',
    names: ['Dr. Wishey Kataria', 'Wishey Kataria'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/04/Wishey-Katariaa-new.jpg',
    file: 'wishey-kataria.jpg',
  },
  {
    id: 'seed-shikha-gupta',
    names: ['Shikha Gupta'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/03/Shikha-Gupta-e1777285881334.jpg',
    file: 'shikha-gupta.jpg',
  },
  {
    id: 'seed-tarandeep-singh',
    names: ['Tarandeep Singh'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/03/tarandeep-e1777285921139.png',
    file: 'tarandeep-singh.png',
  },
  {
    id: 'seed-tanya-sharma',
    names: ['Tanya Sharma'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/03/phf-pics--e1777285998333.jpg',
    file: 'tanya-sharma.jpg',
  },
  {
    id: 'seed-megha-sharma',
    names: ['Megha Sharma'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/05/megha-sharma-e1777286070496.jpg',
    file: 'megha-sharma.jpg',
  },
  {
    id: 'seed-meghna-chauhan',
    names: ['Meghna Chauhan'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/02/Meghna-Chauhan-e1777357877106.png',
    file: 'meghna-chauhan.png',
  },
  {
    id: 'seed-alisha-nakra',
    names: ['Alisha Nakra'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2025/03/alisha-nakra-copy.jpg',
    file: 'alisha-nakra.jpg',
  },
  {
    id: 'seed-harshita-hetawal',
    names: ['Harshita Hetawal'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/02/Harshita-Hetawal-e1777357845344.jpg',
    file: 'harshita-hetawal.jpg',
  },
  {
    id: 'seed-priyanka-chaturvedi',
    names: ['Priyanka Chaturvedi'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/03/priyanka-chaturvedi-e1777357537453.jpg',
    file: 'priyanka-chaturvedi.jpg',
  },
  {
    id: 'seed-sweety-sharma',
    names: ['Sweety Sharma'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/04/sweety-sharma-e1777357923625.jpg',
    file: 'sweety-sharma.jpg',
  },
  {
    id: 'seed-isha-gandhi',
    names: ['Isha Gandhi'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/02/Isha-Gandhi-e1777357180698.jpg',
    file: 'isha-gandhi.jpg',
  },
  {
    id: 'seed-deviyani-kaur',
    names: ['Deviyani Kaur'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/04/deviyani_kaur.jpg',
    file: 'deviyani-kaur.jpg',
  },
  {
    id: 'seed-adv-gulshan',
    names: ['Adv. Gulshan', 'Gulshan'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/04/Adv_gulshan.jpg',
    file: 'adv-gulshan.jpg',
  },
  {
    id: 'seed-adv-kapil-batra',
    names: ['Adv. Kapil Batra', 'Kapil Batra'],
    url: 'https://www.dsblawgroup.com/wp-content/uploads/2026/04/Adv-kapil_batra.jpg',
    file: 'adv-kapil-batra.jpg',
  },
];

export const TEAM_PHOTO_FILES: Record<string, string> = Object.fromEntries(
  TEAM_PHOTO_SOURCES.map((photo) => [photo.id, `/team/${photo.file}`]),
);

export function normalizeTeamName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/\b(dr|mr|ms|mrs|adv|advocate)\.?/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

const PHOTO_BY_NAME: Record<string, string> = {};
for (const photo of TEAM_PHOTO_SOURCES) {
  const path = `/team/${photo.file}`;
  for (const name of photo.names) {
    PHOTO_BY_NAME[normalizeTeamName(name)] = path;
  }
}

export function photoPathForTeamName(name: string | null | undefined): string | null {
  if (!name?.trim()) return null;
  const key = normalizeTeamName(name);
  if (PHOTO_BY_NAME[key]) return PHOTO_BY_NAME[key];

  const parts = key.split(' ');
  if (parts.length > 2) {
    const firstLast = `${parts[0]} ${parts[parts.length - 1]}`;
    if (PHOTO_BY_NAME[firstLast]) return PHOTO_BY_NAME[firstLast];
  }
  return null;
}

export function adminTeamImagePath(member: {
  name?: string | null;
  imagePath?: string | null;
}): string | null {
  return member.imagePath?.trim() || photoPathForTeamName(member.name) || null;
}

export function publicTeamImagePath(member: {
  name?: string | null;
  imagePath?: string | null;
  showPhotoOnFront?: boolean | null;
}): string | null {
  if (member.showPhotoOnFront === false) return null;
  return adminTeamImagePath(member);
}

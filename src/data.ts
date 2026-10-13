export type Category = 'Volunteer' | 'Gathering' | 'Workshop' | 'Internship';
export type Listing = {
  id: string;
  title: string;
  organization: string;
  organizationType: string;
  category: Category;
  when: string;
  location: string;
  coordinates: [number, number];
  description: string;
  detail: string;
};

// Illustrative Atlanta listings, not verified events or offers.
export const listings: Listing[] = [
  {
    id: 'garden',
    title: 'A little dirt. A lot of good.',
    organization: 'Oak & Root Community Garden',
    organizationType: 'Community organization',
    category: 'Volunteer',
    when: 'Sat, Oct 24 · 9:00 AM',
    location: 'Old Fourth Ward, Atlanta',
    coordinates: [33.766, -84.372],
    description:
      'Help plant the next season of vegetables for the neighborhood pantry. Bring a friend; we’ll bring the tools.',
    detail:
      'Outdoor volunteer session · All experience levels welcome. This is a sample listing; registration is not available.',
  },
  {
    id: 'table',
    title: 'Meet your neighbors at the table',
    organization: 'Grace Community Church',
    organizationType: 'Local church',
    category: 'Gathering',
    when: 'Sun, Oct 25 · 12:30 PM',
    location: 'Midtown, Atlanta',
    coordinates: [33.781, -84.386],
    description:
      'An open community lunch with local makers and neighbors. Everyone has a seat, whether it’s your first visit or your fiftieth.',
    detail:
      'Community lunch · Open to everyone. This is a sample listing; registration is not available.',
  },
  {
    id: 'repair',
    title: 'Fix it together: neighborhood repair day',
    organization: 'Second Life Workshop',
    organizationType: 'Small business',
    category: 'Workshop',
    when: 'Sat, Oct 31 · 10:00 AM',
    location: 'West Midtown, Atlanta',
    coordinates: [33.786, -84.411],
    description:
      'Learn a practical skill, keep something out of the landfill, and get to know the people behind your local businesses.',
    detail:
      'Hands-on workshop · Bring a small household item. This is a sample listing; registration is not available.',
  },
  {
    id: 'books',
    title: 'Make room for the next chapter',
    organization: 'Eastside Learning Collective',
    organizationType: 'School partner',
    category: 'Volunteer',
    when: 'Wed, Oct 28 · 3:30 PM',
    location: 'Downtown, Atlanta',
    coordinates: [33.755, -84.39],
    description:
      'Join a book-sorting afternoon to help stock a school reading corner. A small afternoon can open a big world.',
    detail:
      'Book sorting · Suitable for groups. This is a sample listing; registration is not available.',
  },
  {
    id: 'intern-community',
    title: 'Community outreach intern',
    organization: 'Atlanta Neighborhood Network',
    organizationType: 'Community organization',
    category: 'Internship',
    when: 'Spring 2027 · 12 weeks',
    location: 'Downtown, Atlanta',
    coordinates: [33.761, -84.39],
    description:
      'Help connect neighborhood partners, plan volunteer days, and tell the stories of the people making a difference.',
    detail:
      'Sample paid opportunity · 10–15 hours/week · Hybrid. No real employer or application is represented.',
  },
  {
    id: 'intern-design',
    title: 'Local business design intern',
    organization: 'Common Ground Studio',
    organizationType: 'Small business',
    category: 'Internship',
    when: 'Spring 2027 · 10 weeks',
    location: 'Summerhill, Atlanta',
    coordinates: [33.738, -84.385],
    description:
      'Put your creative skills to work on materials for independent shops and community organizations.',
    detail:
      'Sample paid opportunity · 15 hours/week · In person. No real employer or application is represented.',
  },
];

export function filterListings(
  items: Listing[],
  tab: string,
  query: string,
  category: string,
  saved: string[],
) {
  const term = query.trim().toLocaleLowerCase();
  return items.filter((item) => {
    const matchesTab =
      tab === 'Internships'
        ? item.category === 'Internship'
        : tab === 'Saved'
          ? saved.includes(item.id)
          : tab === 'Feed'
            ? item.category !== 'Internship'
            : true;
    const matchesCategory = category === 'All' || item.category === category;
    const matchesQuery =
      `${item.title} ${item.organization} ${item.organizationType} ${item.location} ${item.description}`
        .toLocaleLowerCase()
        .includes(term);
    return matchesTab && matchesCategory && matchesQuery;
  });
}

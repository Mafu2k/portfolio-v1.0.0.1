export interface Project {
  id:          string;
  index:       string;
  title:       string;
  category:    string;
  year:        string;
  location:    string;
  scope:       string[];
  description: string;
  featured:    boolean;
}

export const profile = {
  studio:   'Atelier Lorem',
  mark:     'ATELIER',
  role:     'Lorem ipsum dolor',
  location: 'Lorem, 00-000',
  email:    'hello@atelierlorem.com',
  phone:    '+00 000 000 000',
  intro:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  biography:
    'Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla, vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
  manifesto:
    'Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  social: {
    instagram: 'https://www.instagram.com',
    behance:   'https://www.behance.net',
    linkedin:  'https://www.linkedin.com',
  },
} as const;

export const projects: Project[] = [
  {
    id:          'lorem-domus',
    index:       '01',
    title:       'Lorem Domus',
    category:    'Rezydencje',
    year:        '2024',
    location:    'Lorem, PL',
    scope:       ['Lorem', 'Ipsum', 'Dolor'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Maecenas sed diam eget risus varius blandit.',
    featured:    true,
  },
  {
    id:          'ipsum-pavilion',
    index:       '02',
    title:       'Ipsum Pavilion',
    category:    'Przestrzeń',
    year:        '2024',
    location:    'Ipsum, PL',
    scope:       ['Sit', 'Amet', 'Vivamus'],
    description: 'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum.',
    featured:    true,
  },
  {
    id:          'dolor-residence',
    index:       '03',
    title:       'Dolor Residence',
    category:    'Wnętrza',
    year:        '2023',
    location:    'Dolor, PL',
    scope:       ['Tellus', 'Magna', 'Cursus'],
    description: 'Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur.',
    featured:    true,
  },
  {
    id:          'amet-house',
    index:       '04',
    title:       'Amet House',
    category:    'Rezydencje',
    year:        '2023',
    location:    'Amet, PL',
    scope:       ['Ridiculus', 'Mus', 'Egestas'],
    description: 'Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
    featured:    false,
  },
  {
    id:          'magna-studio',
    index:       '05',
    title:       'Magna Studio',
    category:    'Przestrzeń',
    year:        '2022',
    location:    'Magna, PL',
    scope:       ['Fusce', 'Dapibus', 'Tortor'],
    description: 'Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus.',
    featured:    false,
  },
  {
    id:          'cursus-loft',
    index:       '06',
    title:       'Cursus Loft',
    category:    'Wnętrza',
    year:        '2022',
    location:    'Cursus, PL',
    scope:       ['Ornare', 'Mollis', 'Bibendum'],
    description: 'Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum.',
    featured:    false,
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Lorem',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna.',
  },
  {
    number: '02',
    title: 'Ipsum',
    desc: 'Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula.',
  },
  {
    number: '03',
    title: 'Dolor',
    desc: 'Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum.',
  },
  {
    number: '04',
    title: 'Amet',
    desc: 'Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla.',
  },
] as const;

export const metrics = [
  { value: '24',  label: 'Lorem ipsum' },
  { value: '08',  label: 'Dolor amet' },
  { value: '12',  label: 'Sit anno' },
] as const;

export const competencies = [
  'Lorem ipsum',
  'Dolor sit amet',
  'Consectetur',
  'Adipiscing elit',
] as const;

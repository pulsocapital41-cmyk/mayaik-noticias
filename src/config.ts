// Configuración central de Mayaik Noticias.
export const SITE = {
  name: 'Mayaik Noticias',
  url: 'https://mayaiknoticias.com.mx',
  tagline: 'Noticias, cultura y comunidad de Quintana Roo',
  description:
    'Mayaik Noticias: periodismo cercano desde Quintana Roo. Noticias locales, cultura maya, historias de la gente, turismo, medio ambiente y vida comunitaria.',
  locale: 'es-MX',
};

export const SECTIONS = [
  { slug: 'noticias-locales', name: 'Noticias Locales', desc: 'Lo que pasa en tu municipio: gobierno, servicios, trámites y la vida diaria en Quintana Roo.' },
  { slug: 'cultura-maya', name: 'Cultura Maya', desc: 'Tradiciones, lengua, patrimonio y la herencia viva del pueblo maya en la península.' },
  { slug: 'historias-de-la-gente', name: 'Historias de la Gente', desc: 'Personas, barrios y testimonios que cuentan cómo se vive Quintana Roo.' },
  { slug: 'turismo-y-sabores', name: 'Turismo y Sabores', desc: 'Destinos, rutas, gastronomía y experiencias para conocer el Caribe mexicano.' },
  { slug: 'medio-ambiente', name: 'Medio Ambiente', desc: 'Selva, mar, cenotes y manglares: cuidado y defensa del territorio.' },
  { slug: 'comunidad', name: 'Comunidad', desc: 'Agenda, eventos, salud, educación, deporte y programas para las familias.' },
];

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const sectionByName = (name: string) => SECTIONS.find((s) => slugify(s.name) === slugify(name));

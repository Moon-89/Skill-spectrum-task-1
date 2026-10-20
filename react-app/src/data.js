export const IMG = 'https://preview.colorlib.com/theme/glint/images/';

export const navLinks = [
	{ id: 'home', label: 'Home' },
	{ id: 'about', label: 'About' },
	{ id: 'services', label: 'Services' },
	{ id: 'works', label: 'Works' },
	{ id: 'clients', label: 'Clients' },
	{ id: 'contact', label: 'Contact' },
];

export const socials = [
	{ name: 'Facebook', icon: 'fa-facebook', heroIcon: 'fa-facebook-f' },
	{ name: 'Twitter', icon: 'fa-twitter', heroIcon: 'fa-twitter' },
	{ name: 'Instagram', icon: 'fa-instagram', heroIcon: 'fa-instagram' },
	{ name: 'Behance', icon: 'fa-behance', heroIcon: 'fa-behance' },
	{ name: 'Dribbble', icon: 'fa-dribbble', heroIcon: 'fa-dribbble' },
];

export const stats = [
	{ count: 127, label: 'Awards Received' },
	{ count: 1505, label: 'Cups of Coffee' },
	{ count: 109, label: 'Projects Completed' },
	{ count: 102, label: 'Happy Clients' },
];

const serviceCopy = 'Nemo cupiditate ab quibusdam quaerat impedit magni. Earum suscipit ipsum laudantium. Quo delectus est. Maiores voluptas ab sit natus veritatis ut. Debitis nulla cumque veritatis. Sunt suscipit voluptas ipsa in tempora esse soluta sint.';

// Outline icons drawn on a 48×48 grid; `handles` are filled white so they mask the line beneath.
export const services = [
	{ title: 'Brand Identity', paths: ['M4 6h40v18H4z M4 17h40 M14 6v11 M24 6v11 M34 6v11 M20 24v15a4 4 0 0 0 8 0V24'] },
	{ title: 'Illustration', paths: ['M8 8h32v32H8z'], handles: 'M4 4h8v8H4z M36 4h8v8h-8z M4 36h8v8H4z M36 36h8v8h-8z' },
	{ title: 'Marketing', paths: ['M4 17h12l26-10v32L16 29H4z M16 17v12 M8 29l-3 13h7l4-13'] },
	{ title: 'Web Design', circle: true, paths: ['M8 12c4 2 8 2 9 6s-3 6 0 9 7 1 8 5-3 6-2 10 M30 4c-2 4 0 7 4 8s5 4 3 8-3 6 0 9 6 1 8-2'] },
	{ title: 'Packaging Design', paths: ['M24 3l20 10v22L24 45 4 35V13z M4 13l20 10 20-10 M24 23v22'] },
	{ title: 'Web Development', paths: ['M4 14h40v30H4z M4 36h40 M9 14V5h11v9 M28 14V5h11v9'] },
].map(s => ({ ...s, text: serviceCopy }));

export const works = [
	{ thumb: 'lady-shutterbug', full: 'g-shutterbug', title: 'Shutterbug', cat: 'Branding' },
	{ thumb: 'woodcraft', full: 'g-woodcraft', title: 'Woodcraft', cat: 'Web Design' },
	{ thumb: 'the-beetle', full: 'g-beetle', title: 'The Beetle', cat: 'Web Development' },
	{ thumb: 'grow-green', full: 'g-grow-green', title: 'Grow Green', cat: 'Branding' },
	{ thumb: 'guitarist', full: 'g-guitarist', title: 'Guitarist', cat: 'Web Design' },
	{ thumb: 'palmeira', full: 'g-palmeira', title: 'Palmeira', cat: 'Web Design' },
];

export const workCaption = 'Vero molestiae sed aut natus excepturi. Et tempora numquam. Temporibus iusto quo. Unde dolorem corrupti neque nisi.';

export const clients = ['vantorra', 'orbelle', 'kestrin', 'halvane', 'noxley', 'parvane', 'quillo', 'solvero'];

export const testimonials = [
	{
		text: 'Qui ipsam temporibus quisquam vel. Maiores eos cumque distinctio nam accusantium ipsum. Laudantium quia consequatur molestias delectus culpa facere hic dolores aperiam. Accusantium quos qui praesentium corpori. Excepturi nam cupiditate culpa doloremque deleniti repellat.',
		name: 'Liam Carter', pos: 'Founder, Harbor & Pine', avatar: 'user-01.jpg',
	},
	{
		text: 'Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci. Nisi eaque consequatur. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel.',
		name: 'Marcus Reed', pos: 'Creative Director, Vela Studio', avatar: 'user-05.jpg',
	},
	{
		text: 'Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam. Autem eaque officia cum exercitationem sunt voluptatum accusamus. Quasi voluptas eius distinctio.',
		name: 'Owen Walsh', pos: 'CEO, Ironleaf Outfitters', avatar: 'user-02.jpg',
	},
];

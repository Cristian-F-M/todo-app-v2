import {
	IconBrandFacebook,
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandThreads,
	IconBrandX,
	IconMail,
	IconWorld
} from '@tabler/icons-react-native'

interface SocialMedia {
	id: string
	name: string
	url: string
	icon: () => React.ReactNode
}

export const SOCIAL_MEDIA = [
	{
		id: 'instagram',
		name: 'Instragram',
		url: 'https://instagram.com/__cristian.morales',
		icon: () => <IconBrandInstagram />
	},
	{
		id: 'x',
		name: 'X',
		url: 'https://x.com/Morales_M20',
		icon: () => <IconBrandX />
	},
	{
		id: 'threads',
		name: 'Threads',
		url: 'https://www.threads.com/@__cristian.morales',
		icon: () => <IconBrandThreads />
	},
	{
		id: 'facebook',
		name: 'Facebook',
		url: 'https://www.facebook.com/cristian.morales.908140',
		icon: () => <IconBrandFacebook />
	},
	{
		id: 'email',
		name: 'Email',
		url: 'mailto:cfmorales.diaz@gmail.com',
		icon: () => <IconMail />
	},
	{
		id: 'github',
		name: 'Github',
		url: 'https://github.com/Cristian-F-M',
		icon: () => <IconBrandGithub />
	},
	{
		id: 'web',
		name: 'Web',
		url: 'https://cmorales.work',
		icon: () => <IconWorld />
	}
] satisfies SocialMedia[]
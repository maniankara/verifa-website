<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import MobileMenu from './_mobileMenu.svelte';
	import WorkMenu from './_workMenu.svelte';
	import { headerVisible } from './store';
	import AboutMenu from './_aboutMenu.svelte';

	interface Link {
		text: string;
		url: string;
	}
	const navLinks: Link[] = [
		{
			text: 'Careers',
			url: '/careers/'
		},
		{
			text: 'Blog',
			url: '/blog/'
		},
		{
			text: 'Projects',
			url: '/projects/'
		},
		{
			text: 'Contact',
			url: '/contact/'
		}
	];

	let showMenu: boolean = false;
	let mobileMenu: HTMLElement = null;

	let previousY: number;
	let currentY: number;
	let clientHeight: number;

	const isScrollingUp = (y: number) => {
		const scrollUp = !previousY || previousY < y ? false : true;
		previousY = y;

		return scrollUp;
	};

	$: scrollUp = isScrollingUp(currentY);
	$: headerVisible.set(scrollUp || currentY <= clientHeight * 4);

	onMount(() => {
		const handleOutsideClick = (event) => {
			if (showMenu && !mobileMenu.contains(event.target)) {
				showMenu = false;
			}
		};

		const handleEscape = (event) => {
			if (showMenu && event.key === 'Escape') {
				showMenu = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<svelte:window bind:scrollY={currentY} />

<header
	class="sticky top-0 py-6 px-8 sm:px-16 bg-v-white/50 backdrop-blur-sm transition-transform ease-in"
	class:-translate-y-full={!$headerVisible}
	bind:clientHeight
>
	<div bind:this={mobileMenu}>
		<nav class="mx-auto flex items-center justify-between gap-x-8" aria-label="Global">
			<a class="flex-none" href="/">
				<span class="sr-only">verifa</span>
				<img
					class="h-10 w-full md:h-12 object-contain object-left"
					src="/verifa-logo.svg"
					alt="verifa-logo"
				/>
			</a>
			<!-- Desktop menu -->
			<div class="hidden md:flex md:items-center md:gap-x-10 md:flex-wrap">
				<WorkMenu />
				<AboutMenu />
				{#each navLinks as link}
					<a
						href={link.url}
						class="text-xl py-2 text-v-black hover:text-v-lilac font-medium border-b-2 border-v-black transition-all ease-in-out duration-150  {link.url ===
						$page.url.pathname
							? 'border-solid'
							: 'border-transparent'}">{link.text}</a
					>
				{/each}
			</div>
			<!-- Mobile menu button -->
			<MobileMenu />
		</nav>
	</div>
</header>

<script lang="ts">
	let { children } = $props();
	import { getFirebase, login, logout, onAuth, SetUserData } from '$lib/firebase.client';
	import { setContext } from 'svelte';
	import type { User } from 'firebase/auth';

	let app = getFirebase();

	let userState: {user: User | null} = $state({user: app.auth.currentUser});
	setContext('userState', userState);

	onAuth((callback: any) => {
		userState.user = callback;

		if(userState.user != null){
			let userData = new UserData(false, userState.user.uid, userState.user.displayName ?? '', userState.user.photoURL ?? 'face');
			SetUserData(userData, app.auth, app.firestore)
		}
	})

    import '$lib/hoverable.css'
	import LoginForm from '$lib/login-form.svelte';'$lib/login-form'
	import ThemePicker from '$lib/theme-picker.svelte';
    import Profile from '$lib/profile.svelte';
    import { UserData, userDataConverter } from '$lib/types';
</script>

<main>
	<nav class="navbar">
		<div class="links">
			<a href="/">Home</a>
		</div>
		
		<div class="links">
			<a href="/community/">Community</a>
		</div>

		<div class="links">
			{#if userState.user == null}
			<button onclick={() => login()}>login</button>
			{:else}
			<button onclick={() => logout()}>Log out</button>
			<a href={`/submissions/user/${userState.user.uid}`}>Profile</a>
			<a href={`/account/`}>My account</a>
			{/if}
		</div>
		
		<div class="links">
			<a href="/contact/">Contact</a>
			<a href="/about/">About</a>
		</div>
	</nav>
	<div class="toolbar">
		{#if userState.user == null}
			<LoginForm/> {:else} <Profile/>
		{/if}
		<ThemePicker/>
	</div>
	{@render children()}
</main>


<style>
	:root{
		--clr_palette_0: #27292f;
		--clr_palette_1: #433a5c;
		--clr_palette_2: #6b3956;
		--clr_palette_3: #98474c;
		--clr_palette_4: #dea86c;

		--clr_code: rgb(53, 53, 53);
		--clr_code_border: rgb(120, 120, 120);
		--clr_code_text: rgb(249, 237, 216);
		--clr_accept: #a8ca9e;
		--clr_transparent_dark_25: hsla(0, 0%, 0%, 0.25);
		--clr_transparent_dark_35: hsla(0, 0%, 0%, 0.35);
		--clr_transparent_dark_50: hsla(0, 0%, 0%, 0.50);
		--clr_transparent_dark_65: hsla(0, 0%, 0%, 0.65);
		--clr_transparent_dark_75: hsla(0, 0%, 0%, 0.75);

		--clr_transparent_light_25: hsla(0, 0%, 100%, 0.25);
		--clr_transparent_light_35: hsla(0, 0%, 100%, 0.35);
		--clr_transparent_light_50: hsla(0, 0%, 100%, 0.50);
		--clr_transparent_light_65: hsla(0, 0%, 100%, 0.65);
		--clr_transparent_light_75: hsla(0, 0%, 100%, 0.75);
	}
	:global(body){
		display: flex;
    	flex-direction: column;
    	justify-content: start;
    	background-color: var(--clr_palette_0);
		margin: 0;
		padding: 0;
		font-family: sans-serif;

		background-size: 40px 40px;
  		background-image: radial-gradient(circle, var(--clr_palette_1) 2px, rgba(0, 0, 0, 0) 1px);
	}

	:global(.material-icons) {
		font-size: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	  	font-variation-settings:
	  	'FILL' 0,
	  	'wght' 400,
	  	'GRAD' 0,
	  	'opsz' 24
	}

	:global(.firebase-emulator-warning){
		display: none;
	}

	a{all: unset; cursor: pointer;}
	.navbar{
		position: absolute;
		width: 100%;
		background-color: var(--clr_transparent_dark_25);
		color: var(--clr_palette_0);
        font-family: "Roboto Mono", serif;
		text-transform: lowercase;
		font-weight: bold;
		font-size: 18px;
		display: flex;
		gap: .5rem;
		padding: .5rem;
	}

	.links{
		display: flex;
		gap: 2px;
		border-radius: .25rem;
		overflow: hidden;
	}
	.links > *{
		background-color: var(--clr_palette_3);
		padding: 0 .5rem;

		&:hover{
			background-color: var(--clr_palette_4);
		}
	}

	.toolbar{
		position: fixed;
		z-index: 5;
		bottom: 50%;
		translate: 0 50%;
		right: 0;

		display: flex;
		flex-direction: column;
		align-items: end;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
		text-shadow: 0px 0px 12px var(--clr_transparent_dark_75);
	}

	:global(.toolbar *, .toolbar .material-symbols-outlined) {
		color: var(--clr_palette_4);
	}

	@media screen and (max-width: 600px){
		.toolbar{
			bottom: 0px;
			translate: unset;
		}
	}
</style>

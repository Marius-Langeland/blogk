// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		type User = {
			displayName: string | null
			photoURL: string | null;
			uid: string;
			email: string | null;
		};
	}
}

export {};

<script lang="ts">
    import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
    import { getFirebase } from './firebase.client';
    import { login } from './firebase.client';
</script>

<button class="material-icons" onclick={login}>login</button>


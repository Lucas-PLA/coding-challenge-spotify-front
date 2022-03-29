<script setup>
	import { ref } from 'vue';
	import { queryAlbumsWithFilter } from '../scripts/query';

	const researchFilter = ref("");
	const albums = ref([]);

	function search() {
		// TODO : récupérer de manière asynchrone
		albums.value = queryAlbumsWithFilter(researchFilter.value);
	}
</script>

<template>
	<div>
		<h1>Rechercher</h1>

		<!-- TODO: debounce sur l'input plutot qu'un bouton -->
		<input type="texte" v-model="researchFilter"/>
		<button @click='search'>chercher</button>

		<h2>Résultats :</h2>
		<table>
			<thead>
				<tr>
					<td>titre</td>
					<td>date de sortie</td>
					<td>nombre de morceaux</td>
					<td>pochette</td>
				</tr>
			</thead>
			<tbody>
				<template v-for="album in albums" :key="album.id">
					<tr>
						<td>{{album.name}}</td>
						<td>{{album.releaseDate}}</td>
						<td>{{album.nbTracks}}</td>
						<td><img src={{album.imageUrl}} /></td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>
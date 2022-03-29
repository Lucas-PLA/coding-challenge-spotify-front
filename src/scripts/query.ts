import axios from 'axios';

export interface Album {
	id: string,
	name: string,
	imageUrl: string,
	releaseDate: string,
	nbTracks: number
}

const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search';
//TODO : requête pour récupérer le jeton d'authentification
const token = "BQCtrNKS-eqGFr6Ed49nW4ifD0DG-GZ8Hi3fWjBqtx5KNzfsajsq-kglDWrIiMUE5yBnG0ZBckbzpcYouR4";

export const queryAlbumsWithFilter = (filter : string) => {
	let albumsToReturn : Album[] = [];
	
	axios.get(SPOTIFY_SEARCH_URL + '?type=album&q=' + filter, {headers: {Authorization: 'Bearer ' + token}})
		.then(response => {
			response.data.albums.items.forEach((albumData: any) => {
				const {id, images, name, release_date, total_tracks, ...rest} = albumData;
				albumsToReturn.push({id: id, imageUrl: images[1].url, name: name, releaseDate: release_date, nbTracks: total_tracks}); // Par simplicité, on prend la première image
			})
		})
		.catch(error => console.log(error));
	
	return albumsToReturn;
}
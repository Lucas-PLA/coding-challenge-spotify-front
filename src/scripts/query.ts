import axios from 'axios';

export interface Album {
	id: string,
	name: string,
	imageUrl: string,
	releaseDate: string,
	nbTracks: number
}

const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search';
const ADD_TO_LIBRARY_URL = 'http://localhost:8080/album/';

//TODO : requête pour récupérer le jeton d'authentification
const token = "BQBhAu57-voMziHex0RDAgcAHS6jQQoBFPpP2Udog6Xr3Fm7PXcjnLWkjN4b6nYthOw_5N8u3lL8hIw5QgQ";

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

//TODO : mettre à jour la vue pour griser le bouton si l'appel est effectué avec succes
export const addAlbumToPersonnalLibrary = (albumId : string) => {
	axios.put(ADD_TO_LIBRARY_URL + albumId)
	.catch(error => console.log(error))
}
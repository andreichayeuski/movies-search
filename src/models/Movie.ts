import { Crew } from "./Crew";
import { FavoriteMovie } from "./FavoriteMovie";
import { Genre } from "./Genre";

export interface Movie extends FavoriteMovie {
    title: string;
    credits: {
        crew: Crew[];
    };
    description: string;
    director: string;
    genres: Genre[];
    genre_ids: number[];
    poster: string;
    releaseDate: string;
    vote: {
        average?: number;
        count?: number;
    };
}
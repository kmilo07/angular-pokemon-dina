import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  private url = "https://pokeapi.co/api/v2";
  constructor(private http: HttpClient) {}

  buscarPokemones(): Observable<any> {
    return this.http.get<any>(this.url.concat(`/pokemon?limit=10`));
  }
  buscarPokemoNombre(value: string): Observable<any> {
    return this.http.get<any>(this.url.concat(`/pokemon/${value}`));
  }

  buscarTipo(value: string): Observable<any> {
    return this.http.get<any>(value);
  }
  buscarPokemonesDireccion(value: string): Observable<any> {
    return this.http.get<any>(value);
  }

  buscarPoderesPokemones(value: string): Observable<any> {
    return this.http.get<any>(value);
  }
}

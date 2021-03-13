import { Component, OnInit } from "@angular/core";
import { __await } from "tslib";
import { PokemonService } from "../../services/pokemon.service";
import Swal from 'sweetalert2'

@Component({
  selector: "app-pokemon",
  templateUrl: "./pokemon.component.html",
  styleUrls: ["./pokemon.component.css"]
})
export class PokemonComponent implements OnInit {
  public pokemones: any[] = [];
  public direccionAnterior: String = "";
  public direccionSiguiente: String = "";
  public contador = 1;
  public siguiente = true;
  public atras = false;
  primera = 0;
  entrada;
  
  constructor(private pokemonService: PokemonService) {}
  ngOnInit() {
    this.getPokemons();
  }
  getPokemons() {
    this.pokemones=[];
    this.pokemonService.buscarPokemones().subscribe(
      (res: any) => {
        this.direccionSiguiente = res.next;
        this.getPokemonconTipo(res);
      }
    );
  }

  getPokemonsSiguientes(valor: string) {
    this.primera=0;
    this.atras = true;
    if(this.contador < 111){
      this.contador++;
      if(this.contador == 111){
        this.siguiente = false;
      }
    }
    this.pokemones = [];
    this.pokemonService.buscarPokemonesDireccion(valor).subscribe(
      (res: any) => {
        this.direccionAnterior = res.previous;
        this.direccionSiguiente = res.next;
        this.getPokemonconTipo(res);
      },
      error => {}
    );
  }

  getPokemonsAtras(valor: string) {
    this.primera=0;
    this.siguiente = true;
    if (this.contador > 1) {
      this.contador--;
      this.atras = true;
      if(this.contador==1){
        this.atras = false;
      }
    }
    this.pokemones = [];
    this.pokemonService.buscarPokemonesDireccion(valor).subscribe(
      (res: any) => {
        this.direccionAnterior = res.previous;
        this.direccionSiguiente = res.next;
        this.getPokemonconTipo(res);
      },
      error => {}
    );
  }

  getPokemonconTipo(res: any) {
    res.results.forEach(element => {
          this.pokemonService
            .buscarPokemoNombre(element.name)
            .subscribe((repuesta: any) => {
              this.pokemonService
                .buscarTipo(repuesta.types[0].type.url)
                .subscribe((respuesta: any) => {
                  repuesta.types[0].type.name = respuesta.names[4].name;
                  if(repuesta.types[1]?.type.url){
                    this.pokemonService.buscarTipo(repuesta.types[1]?.type.url)
                    .subscribe((respuesta: any)=>{
                      repuesta.types[1].type.name = respuesta.names[4].name;
                    })
                  }
                  this.pokemonService.buscarPoderesPokemones(repuesta.moves[0].move.url)
                  .subscribe((respuesta : any) =>{
                    repuesta.moves[0].move.name = respuesta.names[5].name;
                  })
                  if(repuesta.moves[1]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(repuesta.moves[1].move.url)
                    .subscribe((respuesta : any) =>{
                      repuesta.moves[1].move.name = respuesta.names[5].name;
                  })
                  }
                  if(repuesta.moves[2]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(repuesta.moves[2].move.url)
                    .subscribe((respuesta : any) =>{
                      repuesta.moves[2].move.name = respuesta.names[5].name;
                  })
                  }
                  if(repuesta.moves[3]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(repuesta.moves[3].move.url)
                    .subscribe((respuesta : any) =>{
                      repuesta.moves[3].move.name = respuesta.names[5].name;
                  })
                  }
                });
              this.pokemones.push(repuesta);
            });
    })
  }

  getTipoPorBusqueda(res: any){
    this.pokemonService.buscarTipo(res.types[0].type.url)
          .subscribe((respuesta: any)=>{
            res.types[0].type.name = respuesta.names[4].name;
            if(res.types[1]?.type.url){
              this.pokemonService.buscarTipo(res.types[1]?.type.url)
                    .subscribe((respuesta: any)=>{
                      res.types[1].type.name = respuesta.names[4].name;
                    })
            }
            this.pokemonService.buscarPoderesPokemones(res.moves[0].move.url)
                  .subscribe((respuesta : any) =>{
                    res.moves[0].move.name = respuesta.names[5].name;
                  })
                  if(res.moves[1]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(res.moves[1].move.url)
                    .subscribe((respuesta : any) =>{
                      res.moves[1].move.name = respuesta.names[5].name;
                  })
                  }
                  if(res.moves[2]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(res.moves[2].move.url)
                    .subscribe((respuesta : any) =>{
                      res.moves[2].move.name = respuesta.names[5].name;
                  })
                  }
                  if(res.moves[3]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(res.moves[3].move.url)
                    .subscribe((respuesta : any) =>{
                      res.moves[3].move.name = respuesta.names[5].name;
                  })
                }
          });
  }
  buscarPokemon(valor: string) {
    this.contador = 1;
    this.atras = false;
    if (valor.length > 0) {
      if(this.primera==0){
        this.pokemones = [];
      }
      this.primera++;
      this.pokemonService.buscarPokemoNombre(valor.toLowerCase()).subscribe(
        (res: any) => {
          this.getTipoPorBusqueda(res);
          this.pokemones.push(res);
        },
        err => {
          // alert(`Pokemon ${valor} no encontrado`);
          Swal.fire({
            imageUrl: 'https://stackblitz.com/files/angular-pokemones2/github/kmilo07/angular-pokemones2/master/src/pika.png',
            title: '¿Quién es ese pokémon?',
            text: `El pokemon "${valor}" no se ha encontrado`
          })
        }
      );
    } else {
      this.primera=0;
      this.getPokemons();
    }
    this.entrada = "";
  }
}

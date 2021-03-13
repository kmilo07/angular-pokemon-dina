import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { PokemonComponent } from "./components/pokemon/pokemon.component";
import { HttpClientModule } from "@angular/common/http";
import { PokemonService } from "./services/pokemon.service";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    PokemonComponent
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule {}

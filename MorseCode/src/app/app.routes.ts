import { Routes } from '@angular/router';
import { EncodeComponent } from './encode/encode.component';
import { DecodeComponent } from './decode/decode.component';

export const routes: Routes = [
  { path: "encode", component: EncodeComponent },
  { path: "decode", component: DecodeComponent}
];

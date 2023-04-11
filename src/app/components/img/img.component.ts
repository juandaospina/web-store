import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
// onInit es un enlace de ciclo de vida de componente, este se llama en un componente
// que recibe propiedades (@Input) de un componente padre
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  public textValue: string = "";
  @Input() set changeText(text: string) {
    this.textValue = text;
    // changeText() se ejecuta solo cuando cambia este Input()
    // El @Input() quedaría con el nombre changeText
    // Code <>
  }
  @Input() state!: boolean;
  @Input() alt: string = "";
  @Output() setState = new EventEmitter<boolean>();
  public counter: number = 0;
  public counterFn: number | undefined | any;

  constructor() {
    // Se ejecuta antes del render
    // No ejecutar cosas asíncronas
    // Normalmente se inicializan propiedades, se inyectan servicios o dependencias 
    console.log("[constructor]")
  }

  // Se ejecuta antes del render
  // Sólo se ejecuta una vez, cuando se monta el componente
  // Se usa para inicializar el componente en llamadas asíncronas, peticiones a un servidor
  ngOnInit(): void {
    console.log("[ngOnInit]")
    this.counterFn = setInterval(() => {
      this.counter += 1;
      console.log("[Running counter]")
    }, 1000)
  }

  // Se ejecuta antes y después del render
  // Se ejecuta cada vez que se detecta un cambio en los @Input
  ngOnChanges() {
    console.log("[ngOnChanges]")
  }

  // Método que corre después de que todo se ha renderizado
  // Se usa para hacer trigger a los hijos del componente
  ngAfterViewInit(): void {
    console.log("[ngAfterViewInit]")
  }

  // Se usa para manejar un disparador cuando es eliminado el componente
  ngOnDestroy(): void {
    
  }
}

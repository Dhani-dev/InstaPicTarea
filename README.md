# instapic-app

# Controles en angular

Cuando hablamos de controles, por lo general nos referimos a los elementos propios de un formulario (inputs, botones checkbox, etc), sin embargo, un control también puede ser un **Componente** en angular, pero con unas características muy definidas:

1. Es reutilizable
2. Agrupa varias caracteristicas o funcionalidades también reutilizables
3. No tiene una lógica propia y se limita a **emitir** valores
---

## Relación padre / hijo

Los controles por lo general están inmersos dentro de otro componente, por ello decimos que el componente principal es el padre y el control es el hijo. Un componente **padre** le pasa información al componente **hijo**, mientras que el componente **hijo** emite valñores a su componente

## Ejemplo

HTML control o componente hijo:


```html
<div class="image-container">
  <img [src]="galleryItem.url" class="image" />
  <div class="comments">
    <input type="text" (change)="onAddComment($event, galleryItem.id)" class="comment-input"/>
    <div class="icons">
      <a (click)="onComment(galleryItem.comments)" class="icon"><i class="fas fa-comments"></i></a>
      <a (click)="onDelete(galleryItem.id)" class="icon"><i class="fas fa-trash-alt"></i></a>
    </div>
  </div>
</div>
```

TS control o componente hijo:

```ts

  @Input('image')
  galleryItem!:GalleryItem;

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  comments = new EventEmitter<Comment[]>();

  @Output()
  addComment = new EventEmitter<string>();


  onDelete(id:string){
    this.delete.emit(id);
  }

  onComment(comments:Comment[]){
    this.comments.emit(comments);
  }

  onAddComment(event:Event, id:string){
    const input = event.target as HTMLInputElement;
    if(!input.value){
      return;
    }
    this.addComment.emit(input.value);
    input.value = '';
  }

```

HTML componente padre:

```html
 <app-image
      [image]="item"
      (delete)="onDeleteImage($event)"
      (comments)="onComments($event)"
      (addComment)="onAddComment($event, item.id)"
    />
```

TS componente padre

```ts
 onDeleteImage(id:string){
    Swal.fire({
      text: "¿Está seguro de eliminar la imagen seleccionada?",
      icon: "warning",
      iconColor: "#219ebc",
      showCancelButton: true,
      confirmButtonColor: "#023047",
      cancelButtonColor: "#d00000",
      confirmButtonText: "Si",
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.galleryService.deleteById(id);
      }
    });
  }

  onComments(comments:Comment[]){
    let htmlContent = 'Aún no hay comentarios, se el primero!';
    if(comments.length>0){
      htmlContent = '<div class="read-comments">';
      comments.forEach(comment => {
        htmlContent += `<p><strong>${comment.userId||''}</strong> - ${comment.message}</p>`;
      });
      htmlContent += '</div>';
    }
    Swal.fire({
      html: htmlContent
    })
  }

  onAddComment(comment:string, id:string){
    this.galleryService.addCommentById(comment, id);
  }
```

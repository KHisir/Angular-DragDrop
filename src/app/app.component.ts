import { Component, OnInit } from '@angular/core';

export interface Item {
  text: string;
  color: string;
  left: number;
  top: number;
  dragStarted?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cc-drag-drop';

  public draggable: Item[] = [];
  public dropped: Item[] = [];

  public dragging?: Item;
  itemOnDropZone = false;

  constructor() {
    // this.dragging = undefined;
  }

  ngOnInit() {
    this.draggable = [
      { text: 'Item 1', color: 'red', left: 0, top: 120 },
      { text: 'Item 2', color: 'green', left: 100, top: 120 },
      { text: 'Item 3', color: 'yellow', left: 200, top: 120 }
    ];
  }

  public dragEnter(event: DragEvent) {
    event.preventDefault();
  }

  public dragOver(event: DragEvent) {
    if (this.dragging) {
      event.preventDefault();
    }

    this.itemOnDropZone = true;
  }

  public dragLeave(event: DragEvent) {
    this.itemOnDropZone = false;
  }

  public dragStart(event: DragEvent, item: Item) {
    if (event.dataTransfer !== null) {
      event.dataTransfer.setData('text', item.text);
      event.dataTransfer.effectAllowed = 'move';
      item.dragStarted = true;
      this.dragging = item;
    }
  }

  public dragEnd(event: DragEvent, item: Item) {
    this.dragging = undefined;
    item.dragStarted = false;
  }

  public drop(event: DragEvent) {
    event.preventDefault(); // Necessary because of Firefox!

    if (this.dragging !== undefined) {
      const index = this.draggable.indexOf(this.dragging);
      this.draggable.splice(index, 1); // Delete item from origin!
      this.dropped.push(this.dragging);
      this.dragging = undefined;
      this.itemOnDropZone = false;
    }
  }
}

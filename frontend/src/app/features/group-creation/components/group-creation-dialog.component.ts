import {Component, Inject} from '@angular/core';
import { Group } from "@core/models/group";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import {GroupCreationService} from "@features/group-creation/services/group-creation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-group-creation-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
  ],
  providers: [

  ],
  templateUrl: './group-creation-dialog.component.html',
  styleUrls: ['./group-creation-dialog.component.css']
})
export class GroupCreationDialogComponent {
  public groupData!: Group;
  public isEditing: boolean = false;
  public selectedColor: string = '#00b5ff';

  constructor(
    private groupCreationService: GroupCreationService,
    private dialogRef: MatDialogRef<GroupCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: { group: Group, isEditing: boolean },
    private snackbar: MatSnackBar
  ) {
    // Create a new mutable object from data.group
    this.groupData = { ...data.group };
    this.isEditing = data.isEditing;
  }

  get groupName() {
    return this.groupData.groupName;
  }

  set groupName(gn:string) {
    this.groupData = {
      ...this.groupData,
      groupName: gn
    } 
  }

  cancel() {
    // this.snackbar.open("Cancelled", "OK");
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.isEditing) {
      this.groupCreationService.updateGroup({
        ...this.groupData,
        colour: this.selectedColor,
      });
    } else {
      this.groupCreationService.createGroup(this.groupData);
    }
  }

  onColorChange(event: any) {
    this.selectedColor = event.target.value;
  }


}

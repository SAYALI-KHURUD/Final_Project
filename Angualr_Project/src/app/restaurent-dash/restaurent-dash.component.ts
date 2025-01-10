import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {RestaurentData} from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css'],
  standalone : false,
  encapsulation: ViewEncapsulation.None
})

export class RestaurentDashComponent implements OnInit {

  formValue!:FormGroup
  restaurentModelObj : RestaurentData = new RestaurentData;
  allRestaurentData: any;
  showAdd!:boolean;
  showBtn!:boolean;

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    })
    this.getAllData();
  }

  clickAddResto()
  {
    console.log('Add Restaurant button clicked');
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
 
  addRestaurent()
  {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.addRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent Added Successfully");
      this.formValue.reset();

      let ref= document.getElementById('clear');
      ref?.click();
      

      this.getAllData();

    }, err=>{
      console.log(err);
      alert("Restaurent Added Failed!");
    })
  }

  getAllData()
  {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData= res;
    }, err=>{
      console.log(err);
    })
  }

  deleteResto(id: string) {
    if (confirm("Are you sure you want to delete this restaurant?")) {
      this.api.deleteRestaurant(id).subscribe(
        (res) => {
          console.log(res);
          alert("Restaurant Deleted Successfully");
          this.getAllData(); // Refresh the data after deletion
        },
        (err) => {
          console.error(err);
          alert("Failed to delete restaurant");
        }
      );
    }
  }
  
  

  onEditResto(data: any)
  {
    this.showAdd = false;
    this.showBtn = true;
    
    this.restaurentModelObj._id = data._id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);

 
  }
  updateResto() {
    if (this.restaurentModelObj._id) {
      this.restaurentModelObj.name = this.formValue.value.name;
      this.restaurentModelObj.email = this.formValue.value.email;
      this.restaurentModelObj.mobile = this.formValue.value.mobile;
      this.restaurentModelObj.address = this.formValue.value.address;
      this.restaurentModelObj.services = this.formValue.value.services;
  
      // Call the update API without passing _id explicitly
      this.api.updateRestaurant(this.restaurentModelObj._id, {
        name: this.restaurentModelObj.name,
        email: this.restaurentModelObj.email,
        mobile: this.restaurentModelObj.mobile,
        address: this.restaurentModelObj.address,
        services: this.restaurentModelObj.services
      }).subscribe(
        (res) => {
          console.log("Update Response:", res);
          alert("Restaurant Updated Successfully");
          this.formValue.reset();
  
          let ref = document.getElementById('clear');
          ref?.click();
  
          this.getAllData();
        },
        (err) => {
          console.error("Update Error:", err);
          alert("Failed to update restaurant");
        }
      );
    } else {
      alert("Invalid record. Cannot update.");
    }
  }
  
  
}

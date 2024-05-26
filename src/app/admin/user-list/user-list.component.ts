import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

interface ApiResponse {
  userData: UserData[];
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  mobile: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  constructor(
    private adminService: AdminAuthService,
    private service: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  userlist: UserData[] = [];
  dataSource = new MatTableDataSource<UserData>(this.userlist); // Use MatTableDataSource

  ngOnInit() {
    console.log('ngOnInit called');
    this.loadUser();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadUser() {
    this.adminService.getUser().subscribe(
      (res: any) => {
        console.log(res)
        const typedResponse = res as ApiResponse;
        this.userlist = typedResponse.userData;
        this.dataSource.data = this.userlist;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error in API call:', error);
      }
    );
  }

  displayedColumns: string[] = ['name', 'email', 'mobile', 'status', 'action'];

  logout(): void {
    this.service.logout();
  }
  updateUser(id: any) {
   
    
  }
  
  addUser() {
    this.router.navigate(['/adduser']);
  }

  deleteUser(id: any) {
   
  }

  onSearchInputChange(event:any){
    
    this.adminService.userSerach(event.target.value).subscribe((res) => {
    
      const typedResponse = res as ApiResponse;
        this.userlist = typedResponse.userData;
        this.dataSource.data = this.userlist;
        this.dataSource.paginator = this.paginator;
      
    });
    
  }
}